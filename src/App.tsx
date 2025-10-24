import { Component, createSignal, onMount, createEffect, For } from "solid-js";
import GoogleMapComponent from "./GoogleMap";
import "./App.css";

interface LatLng {
  lat: number;
  lng: number;
}

interface Path {
  id: string;
  name: string;
  points: LatLng[];
}

const STORAGE_KEY = "halloween-paths";
const EDIT_MODE_KEY = "halloween-edit-mode";
const DEFAULT_CENTER: LatLng = {
  lat: 34.89370155214946,
  lng: 32.37164265057329,
};
const DEFAULT_PATHS: Path[] = [
  {
    id: "longPath",
    name: "Long Path",
    points: [
      { lat: 34.895753538178006, lng: 32.37079149729516 },
      { lat: 34.89576233426445, lng: 32.370287320828716 },
      { lat: 34.89563479283926, lng: 32.36983948416916 },
      { lat: 34.8957799337206, lng: 32.36916635872438 },
      { lat: 34.895606274345894, lng: 32.368343048023924 },
      { lat: 34.89522592922382, lng: 32.367959505552385 },
      { lat: 34.89421637359456, lng: 32.36814189408822 },
      { lat: 34.894201023207145, lng: 32.36746874180822 },
      { lat: 34.89405589732032, lng: 32.36704772220724 },
      { lat: 34.89358967380902, lng: 32.36710135296995 },
      { lat: 34.89315425350565, lng: 32.36628339494715 },
      { lat: 34.89333461440617, lng: 32.36600718444337 },
      { lat: 34.89296298665465, lng: 32.36554590990356 },
      { lat: 34.892674907922945, lng: 32.36608227455539 },
      { lat: 34.89245500576187, lng: 32.36612518319083 },
      { lat: 34.8922526596452, lng: 32.366460422419316 },
      { lat: 34.89278046096026, lng: 32.367187171918026 },
      { lat: 34.89292996289221, lng: 32.3680131514099 },
      { lat: 34.89226585178337, lng: 32.369000065119856 },
      { lat: 34.892666111836505, lng: 32.36937551232557 },
      { lat: 34.8925429666263, lng: 32.37008350481037 },
      { lat: 34.89334559489043, lng: 32.37068422402935 },
      { lat: 34.893422575270606, lng: 32.370952404678064 },
      { lat: 34.894020402079036, lng: 32.37070836055608 },
      { lat: 34.89473315891199, lng: 32.370759137224915 },
      { lat: 34.89497336995567, lng: 32.37151769545958 },
    ],
  },
  {
    id: "shortPath",
    name: "Short Path",
    points: [
      { lat: 34.89424701795926, lng: 32.372169838981286 },
      { lat: 34.89407969685363, lng: 32.37270622711389 },
      { lat: 34.89443087506647, lng: 32.373103125282924 },
      { lat: 34.894385761185696, lng: 32.37382186840738 },
      { lat: 34.89405537437225, lng: 32.37386740725867 },
      { lat: 34.893821960464344, lng: 32.374599444024234 },
      { lat: 34.89356394056463, lng: 32.375599817418035 },
      { lat: 34.89292939535401, lng: 32.375908172500026 },
      { lat: 34.8923508966462, lng: 32.37661901994533 },
      { lat: 34.89151054137688, lng: 32.376232877447514 },
      { lat: 34.89106677064879, lng: 32.37575315580791 },
      { lat: 34.891004957265835, lng: 32.37529449806636 },
      { lat: 34.8904463045749, lng: 32.37479560718959 },
      { lat: 34.89099881885021, lng: 32.37369321928447 },
      { lat: 34.89319083306189, lng: 32.37260896168728 },
    ],
  },
];

// Generate a color based on index using HSL
const getPathColor = (index: number): string => {
  const hue = (index * 137.5) % 360; // Golden angle for good distribution
  return `hsl(${hue}, 85%, 55%)`;
};

const App: Component = () => {
  const [paths, setPaths] = createSignal<Path[]>([]);
  const [selectedPathId, setSelectedPathId] = createSignal<string | null>(null);
  const [isEditing, setIsEditing] = createSignal(false);
  const [editModeEnabled, setEditModeEnabled] = createSignal(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = createSignal<
    number | null
  >(null);
  const [currentLocation, setCurrentLocation] = createSignal<LatLng | null>(
    null,
  );
  const [apiKey, setApiKey] = createSignal<string>("");
  const [map, setMap] = createSignal<google.maps.Map | undefined>(undefined);
  const [draggedPosition, setDraggedPosition] = createSignal<LatLng | null>(
    null,
  );

  let polylines: Map<string, google.maps.Polyline> = new Map();
  let markers: Map<string, google.maps.Marker[]> = new Map();
  let currentLocationMarker: google.maps.Marker | undefined;
  let isDragging = false;

  // Load paths from localStorage on mount
  onMount(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPaths(parsed);
        if (parsed.length > 0) {
          setSelectedPathId(parsed[0].id);
        }
      } catch (e) {
        console.error("Failed to parse saved paths", e);
        // If parsing fails, use default paths
        setPaths(DEFAULT_PATHS);
        setSelectedPathId(DEFAULT_PATHS[0].id);
      }
    } else {
      // No saved data, use default paths
      setPaths(DEFAULT_PATHS);
      setSelectedPathId(DEFAULT_PATHS[0].id);
    }

    // Load edit mode setting
    const editMode = localStorage.getItem(EDIT_MODE_KEY);
    setEditModeEnabled(editMode === "true");

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }

    // Load API key from environment
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
    setApiKey(key);

    // Add keyboard shortcut to toggle edit mode (Ctrl+E)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        const newEditMode = !editModeEnabled();
        setEditModeEnabled(newEditMode);
        localStorage.setItem(EDIT_MODE_KEY, String(newEditMode));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Save paths to localStorage whenever they change
  createEffect(() => {
    const currentPaths = paths();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPaths));
  });

  // Get the currently selected path
  const selectedPath = () => {
    const id = selectedPathId();
    if (!id) return null;
    return paths().find((p) => p.id === id) || null;
  };

  // Update all polylines and markers when paths change
  createEffect(() => {
    const mapInstance = map();
    if (!mapInstance) return;

    const currentPaths = paths();

    // Clear existing polylines and markers
    polylines.forEach((polyline) => polyline.setMap(null));
    polylines.clear();
    markers.forEach((markerList) => markerList.forEach((m) => m.setMap(null)));
    markers.clear();

    // Render all paths
    currentPaths.forEach((path, pathIndex) => {
      const color = getPathColor(pathIndex);
      const isSelected = path.id === selectedPathId();

      // Create polyline
      if (path.points.length > 0) {
        const polyline = new google.maps.Polyline({
          path: path.points,
          strokeColor: color,
          strokeOpacity: isSelected ? 1.0 : 0.6,
          strokeWeight: isSelected ? 4 : 2,
          map: mapInstance,
        });
        polylines.set(path.id, polyline);
      }

      // Create markers
      const pathMarkers: google.maps.Marker[] = [];
      path.points.forEach((point, pointIndex) => {
        const isMarkerSelected =
          isSelected && selectedMarkerIndex() === pointIndex;

        const marker = new google.maps.Marker({
          position: point,
          map: mapInstance,
          label: isSelected ? `${pointIndex + 1}` : "",
          draggable: isEditing() && isSelected,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: isMarkerSelected ? 12 : isSelected ? 10 : 6,
            fillColor: color,
            fillOpacity: isMarkerSelected ? 1.0 : isSelected ? 0.9 : 0.6,
            strokeColor: isMarkerSelected ? "#FFD700" : "#ffffff",
            strokeWeight: isMarkerSelected ? 3 : 2,
          },
        });

        // Add click listener to select marker
        if (isEditing() && isSelected) {
          marker.addListener("click", () => {
            if (!isDragging) {
              setSelectedMarkerIndex(pointIndex);
            }
          });

          marker.addListener("dragstart", () => {
            isDragging = true;
            setSelectedMarkerIndex(pointIndex);
          });

          marker.addListener("drag", (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
              setDraggedPosition({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              });
            }
          });

          marker.addListener("dragend", (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
              updatePointPosition(path.id, pointIndex, {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              });
            }
            setDraggedPosition(null);
            // Reset isDragging after a small delay to prevent click event
            setTimeout(() => {
              isDragging = false;
            }, 100);
          });
        }

        pathMarkers.push(marker);
      });
      markers.set(path.id, pathMarkers);
    });
  });

  // Update current location marker
  createEffect(() => {
    const mapInstance = map();
    if (!mapInstance) return;

    const location = currentLocation();
    if (!location) return;

    if (currentLocationMarker) {
      currentLocationMarker.setMap(null);
    }

    currentLocationMarker = new google.maps.Marker({
      position: location,
      map: mapInstance,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });
  });

  const updatePointPosition = (
    pathId: string,
    pointIndex: number,
    newPos: LatLng,
  ) => {
    setPaths((prev) =>
      prev.map((p) => {
        if (p.id === pathId) {
          const newPoints = [...p.points];
          newPoints[pointIndex] = newPos;
          return { ...p, points: newPoints };
        }
        return p;
      }),
    );
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const currentPath = selectedPath();
    if (!isEditing() || !currentPath || isDragging || !e.latLng) return;

    const newPoint: LatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    // Add point to selected path
    setPaths((prev) =>
      prev.map((p) => {
        if (p.id === currentPath.id) {
          return { ...p, points: [...p.points, newPoint] };
        }
        return p;
      }),
    );
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing());
  };

  const handleNewPath = () => {
    const newPath: Path = {
      id: `path-${Date.now()}`,
      name: `Path ${paths().length + 1}`,
      points: [],
    };
    setPaths([...paths(), newPath]);
    setSelectedPathId(newPath.id);
    setIsEditing(true);
  };

  const handleDeletePath = () => {
    const currentPath = selectedPath();
    if (!currentPath) return;

    const confirmed = confirm(`Delete "${currentPath.name}"?`);
    if (!confirmed) return;

    const newPaths = paths().filter((p) => p.id !== currentPath.id);
    setPaths(newPaths);
    setSelectedPathId(newPaths.length > 0 ? newPaths[0].id : null);
  };

  const handleRemoveLastPoint = () => {
    const currentPath = selectedPath();
    if (!currentPath || currentPath.points.length === 0) return;

    setPaths((prev) =>
      prev.map((p) => {
        if (p.id === currentPath.id) {
          const newPoints = [...p.points];
          newPoints.pop(); // Remove last point
          return { ...p, points: newPoints };
        }
        return p;
      }),
    );
    setSelectedMarkerIndex(null);
  };

  const handleMapReady = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);

    // Re-trigger path rendering if we have saved paths
    const currentPaths = paths();
    if (currentPaths.length > 0) {
      setPaths([...currentPaths]);
    }
  };

  return (
    <div class="app">
      <div class="header">
        <h1>Halloween Tracer</h1>
        {editModeEnabled() && (
          <div class="controls">
            <div class="path-selector">
              <select
                value={selectedPathId() || ""}
                onChange={(e) => setSelectedPathId(e.currentTarget.value)}
                disabled={paths().length === 0}
              >
                <option value="" disabled>
                  Select a path
                </option>
                <For each={paths()}>
                  {(path) => <option value={path.id}>{path.name}</option>}
                </For>
              </select>
              <button onClick={handleNewPath} class="new-btn">
                New Path
              </button>
            </div>
            <div class="buttons">
              <button
                onClick={handleEditToggle}
                class={isEditing() ? "save-btn" : "edit-btn"}
                disabled={!selectedPath()}
              >
                {isEditing() ? "Done" : "Edit"}
              </button>
              <button
                onClick={handleRemoveLastPoint}
                class="undo-btn"
                disabled={!selectedPath() || selectedPath()!.points.length === 0}
                title="Remove last point"
              >
                ← Remove Last
              </button>
              <button
                onClick={handleDeletePath}
                class="delete-btn"
                disabled={!selectedPath()}
              >
                Delete Path
              </button>
            </div>
          </div>
        )}
      </div>
      <div class={`map-container ${isEditing() ? "editing" : ""}`}>
        {isEditing() && selectedPath() && (
          <div class="edit-mode-banner">
            Click to add points • Drag markers to move them
          </div>
        )}
        {draggedPosition() && (
          <div class="coordinates-display">
            Lat: {draggedPosition()!.lat.toFixed(6)}, Lng:{" "}
            {draggedPosition()!.lng.toFixed(6)}
          </div>
        )}
        {apiKey() ? (
          <GoogleMapComponent
            apiKey={apiKey()}
            center={DEFAULT_CENTER}
            zoom={16}
            mapTypeId="satellite"
            onMapReady={handleMapReady}
            onClick={handleMapClick}
          />
        ) : (
          <div class="api-key-prompt">
            <p>Please add your Google Maps API key to .env file:</p>
            <code>VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
