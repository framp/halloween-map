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
    id: "shortPath",
    name: "Short Path",
    points: [
      {
        lat: 34.89424258801125,
        lng: 32.37237982963259,
      },
      {
        lat: 34.894053390119595,
        lng: 32.37248711799319,
      },
      {
        lat: 34.8942029884886,
        lng: 32.37262659286196,
      },
      {
        lat: 34.89407538989684,
        lng: 32.372782160984826,
      },
      {
        lat: 34.89429978728806,
        lng: 32.372808983074975,
      },
      {
        lat: 34.894233788118996,
        lng: 32.37300210212405,
      },
      {
        lat: 34.894471384879544,
        lng: 32.37301819537814,
      },
      {
        lat: 34.89433498682325,
        lng: 32.37323813651736,
      },
      {
        lat: 34.89449778447718,
        lng: 32.37337761138613,
      },
      {
        lat: 34.89436138646471,
        lng: 32.37349562858279,
      },
      {
        lat: 34.89449338454484,
        lng: 32.37364046786959,
      },
      {
        lat: 34.89429538734513,
        lng: 32.37376384948428,
      },
      {
        lat: 34.89426898768243,
        lng: 32.37399451945956,
      },
      {
        lat: 34.89414138919319,
        lng: 32.373790671574426,
      },
      {
        lat: 34.89406658998664,
        lng: 32.37401061271365,
      },
      {
        lat: 34.89395219106846,
        lng: 32.37390332435305,
      },
      {
        lat: 34.89396539095177,
        lng: 32.37419836734469,
      },
      {
        lat: 34.89376739247948,
        lng: 32.37424128268893,
      },
      {
        lat: 34.89390379147819,
        lng: 32.37446658824618,
      },
      {
        lat: 34.89374099264712,
        lng: 32.37461142753298,
      },
      {
        lat: 34.893861105746666,
        lng: 32.374786421240024,
      },
      {
        lat: 34.89369390685582,
        lng: 32.37489907401865,
      },
      {
        lat: 34.893799506194895,
        lng: 32.37509755748575,
      },
      {
        lat: 34.893605907302884,
        lng: 32.37516193050211,
      },
      {
        lat: 34.8937203067033,
        lng: 32.37533359187906,
      },
      {
        lat: 34.89352670762468,
        lng: 32.3754301514036,
      },
      {
        lat: 34.893663107023016,
        lng: 32.37558571952646,
      },
      {
        lat: 34.89343430790358,
        lng: 32.37565545696085,
      },
      {
        lat: 34.8933373175618,
        lng: 32.375857929653584,
      },
      {
        lat: 34.89326251762315,
        lng: 32.37567553944057,
      },
      {
        lat: 34.89317011760491,
        lng: 32.37591157383388,
      },
      {
        lat: 34.89310411752824,
        lng: 32.37570772594875,
      },
      {
        lat: 34.89303811739857,
        lng: 32.37595985359615,
      },
      {
        lat: 34.892875316851985,
        lng: 32.37579892105526,
      },
      {
        lat: 34.89289291692662,
        lng: 32.3760403198666,
      },
      {
        lat: 34.892721156020016,
        lng: 32.375946503516865,
      },
      {
        lat: 34.89277835635615,
        lng: 32.376209360000324,
      },
      {
        lat: 34.89261115526164,
        lng: 32.376155715820026,
      },
      {
        lat: 34.89268595579335,
        lng: 32.37635419928713,
      },
      {
        lat: 34.89247475411672,
        lng: 32.37630055510683,
      },
      {
        lat: 34.8925319546244,
        lng: 32.37650976740999,
      },
      {
        lat: 34.892382353212454,
        lng: 32.37650976740999,
      },
      {
        lat: 34.89229215222946,
        lng: 32.37671093308611,
      },
      {
        lat: 34.89225035174037,
        lng: 32.37650440299196,
      },
      {
        lat: 34.89215201565245,
        lng: 32.37662254488711,
      },
      {
        lat: 34.89212561530098,
        lng: 32.376421379210996,
      },
      {
        lat: 34.89205081425908,
        lng: 32.37649916327243,
      },
      {
        lat: 34.8920134137126,
        lng: 32.376327501895474,
      },
      {
        lat: 34.89190781207767,
        lng: 32.376458930137204,
      },
      {
        lat: 34.89187041146607,
        lng: 32.37625240004306,
      },
      {
        lat: 34.891800010268675,
        lng: 32.376442836883115,
      },
      {
        lat: 34.891751609410456,
        lng: 32.376217531325864,
      },
      {
        lat: 34.89167680802804,
        lng: 32.376421379210996,
      },
      {
        lat: 34.891643807396505,
        lng: 32.37618266260867,
      },
      {
        lat: 34.891560205737264,
        lng: 32.3763677350307,
      },
      {
        lat: 34.891511781382505,
        lng: 32.37608790071474,
      },
      {
        lat: 34.89140617910279,
        lng: 32.376289066390854,
      },
      {
        lat: 34.89138197856124,
        lng: 32.37600743444429,
      },
      {
        lat: 34.891287376375864,
        lng: 32.37616568477617,
      },
      {
        lat: 34.89127499126797,
        lng: 32.37586194529552,
      },
      {
        lat: 34.891189189178746,
        lng: 32.37602287783641,
      },
      {
        lat: 34.8911847890692,
        lng: 32.37574929251689,
      },
      {
        lat: 34.89108578654192,
        lng: 32.37588608517665,
      },
      {
        lat: 34.891118787397595,
        lng: 32.37563932194728,
      },
      {
        lat: 34.89099998425511,
        lng: 32.375711741590685,
      },
      {
        lat: 34.89108578654192,
        lng: 32.37550789370555,
      },
      {
        lat: 34.89096918341232,
        lng: 32.37551057591457,
      },
      {
        lat: 34.89107918636919,
        lng: 32.37536841883678,
      },
      {
        lat: 34.89094938286446,
        lng: 32.37535232558269,
      },
      {
        lat: 34.89104610924628,
        lng: 32.37518328444005,
      },
      {
        lat: 34.89083930348232,
        lng: 32.37521547094823,
      },
      {
        lat: 34.89088990494076,
        lng: 32.37507331387044,
      },
      {
        lat: 34.89073810047195,
        lng: 32.375153780140884,
      },
      {
        lat: 34.890788701992726,
        lng: 32.37499284759999,
      },
      {
        lat: 34.89065889802905,
        lng: 32.37510013596059,
      },
      {
        lat: 34.89066549823555,
        lng: 32.374901652493485,
      },
      {
        lat: 34.89056869515386,
        lng: 32.375043809571274,
      },
      {
        lat: 34.89059069586428,
        lng: 32.37484800831319,
      },
      {
        lat: 34.89046749181017,
        lng: 32.374917745747574,
      },
      {
        lat: 34.8905092932064,
        lng: 32.37477290646077,
      },
      {
        lat: 34.89040148956235,
        lng: 32.374633431591995,
      },
      {
        lat: 34.89059509600563,
        lng: 32.374633431591995,
      },
      {
        lat: 34.8904652917361,
        lng: 32.37449932114125,
      },
      {
        lat: 34.8906808987153,
        lng: 32.374485910096176,
      },
      {
        lat: 34.89061269656877,
        lng: 32.37435179964543,
      },
      {
        lat: 34.890786501927245,
        lng: 32.374365210690506,
      },
      {
        lat: 34.89068919547205,
        lng: 32.37419586877002,
      },
      {
        lat: 34.890829999710284,
        lng: 32.374174411097904,
      },
      {
        lat: 34.89076179768752,
        lng: 32.37408053378238,
      },
      {
        lat: 34.89088940142592,
        lng: 32.37405102948322,
      },
      {
        lat: 34.89083219977458,
        lng: 32.37391423682346,
      },
      {
        lat: 34.89098638046861,
        lng: 32.37388160051064,
      },
      {
        lat: 34.89087857745057,
        lng: 32.37373676122384,
      },
      {
        lat: 34.891050182188174,
        lng: 32.37377431215005,
      },
      {
        lat: 34.890964379864194,
        lng: 32.37360533298211,
      },
      {
        lat: 34.89113289967942,
        lng: 32.37368830643877,
      },
      {
        lat: 34.8911020988865,
        lng: 32.373513962852805,
      },
      {
        lat: 34.8912341022035,
        lng: 32.373650755512564,
      },
      {
        lat: 34.89122310193517,
        lng: 32.373487140762656,
      },
      {
        lat: 34.89137490550784,
        lng: 32.37358906470522,
      },
      {
        lat: 34.89137490550784,
        lng: 32.37341740332827,
      },
      {
        lat: 34.891514709130846,
        lng: 32.373519327270834,
      },
      {
        lat: 34.891508108992596,
        lng: 32.37333693705782,
      },
      {
        lat: 34.891633197217025,
        lng: 32.37345227204546,
      },
      {
        lat: 34.89162659708828,
        lng: 32.373283292877524,
      },
      {
        lat: 34.891743199284846,
        lng: 32.373414721119254,
      },
      {
        lat: 34.89172119888306,
        lng: 32.373157229053824,
      },
      {
        lat: 34.8918840017167,
        lng: 32.37330743275866,
      },
      {
        lat: 34.891879601644355,
        lng: 32.37308480941042,
      },
      {
        lat: 34.89200526647275,
        lng: 32.37323937664056,
      },
      {
        lat: 34.89203277269163,
        lng: 32.37302686287194,
      },
      {
        lat: 34.89214902558972,
        lng: 32.37318937049501,
      },
      {
        lat: 34.8921710258769,
        lng: 32.372982840400866,
      },
      {
        lat: 34.892303027476444,
        lng: 32.37312767968767,
      },
      {
        lat: 34.892289827326024,
        lng: 32.3729345606386,
      },
      {
        lat: 34.89241805505854,
        lng: 32.3730671437879,
      },
      {
        lat: 34.89241365501482,
        lng: 32.37287670694784,
      },
      {
        lat: 34.8925544562976,
        lng: 32.37301081739859,
      },
      {
        lat: 34.89255885633377,
        lng: 32.37279892288641,
      },
      {
        lat: 34.892677921074,
        lng: 32.37294644438223,
      },
      {
        lat: 34.89268452111831,
        lng: 32.3727425964971,
      },
      {
        lat: 34.892807721847745,
        lng: 32.372906211247006,
      },
      {
        lat: 34.89281432188162,
        lng: 32.372691634525815,
      },
      {
        lat: 34.89291772234292,
        lng: 32.37285793148474,
      },
      {
        lat: 34.89292872238434,
        lng: 32.37263799034552,
      },
      {
        lat: 34.893043122727775,
        lng: 32.372780147423306,
      },
      {
        lat: 34.89305632275713,
        lng: 32.37260043941931,
      },
      {
        lat: 34.893148722903334,
        lng: 32.3727613719602,
      },
      {
        lat: 34.89316852292118,
        lng: 32.37253070198492,
      },
      {
        lat: 34.89324112294567,
        lng: 32.37272382103399,
      },
    ],
  },
  {
    id: "path-1761430653188",
    name: "Long Path",
    points: [
      {
        lat: 34.8958237834904,
        lng: 32.3702071955107,
      },
      {
        lat: 34.8956587885293,
        lng: 32.37016696237548,
      },
      {
        lat: 34.895731386353006,
        lng: 32.369973843326406,
      },
      {
        lat: 34.895597190325525,
        lng: 32.369853143920736,
      },
      {
        lat: 34.89573578621904,
        lng: 32.36969489358886,
      },
      {
        lat: 34.89566758826894,
        lng: 32.36955541872008,
      },
      {
        lat: 34.89581058390571,
        lng: 32.36945349477752,
      },
      {
        lat: 34.89570498715181,
        lng: 32.36927915119155,
      },
      {
        lat: 34.89581938362906,
        lng: 32.369139676322774,
      },
      {
        lat: 34.89570498715181,
        lng: 32.36899483703597,
      },
      {
        lat: 34.895797384318904,
        lng: 32.36887950204833,
      },
      {
        lat: 34.89564998878871,
        lng: 32.36875343822463,
      },
      {
        lat: 34.8957115869529,
        lng: 32.36861128114684,
      },
      {
        lat: 34.89559279045205,
        lng: 32.36847985290511,
      },
      {
        lat: 34.895647788853445,
        lng: 32.368292619031905,
      },
      {
        lat: 34.895491593297315,
        lng: 32.36831139449501,
      },
      {
        lat: 34.89552582229178,
        lng: 32.36813849960816,
      },
      {
        lat: 34.895354226902924,
        lng: 32.36815459286225,
      },
      {
        lat: 34.89536742656097,
        lng: 32.36795342718613,
      },
      {
        lat: 34.89518703105106,
        lng: 32.36806339775574,
      },
      {
        lat: 34.89508143349559,
        lng: 32.367929287304996,
      },
      {
        lat: 34.895025420339174,
        lng: 32.3681469584818,
      },
      {
        lat: 34.89491940425036,
        lng: 32.36798387659365,
      },
      {
        lat: 34.89482680733948,
        lng: 32.36813437179579,
      },
      {
        lat: 34.89473880900014,
        lng: 32.36802440122618,
      },
      {
        lat: 34.89468380999016,
        lng: 32.36820142702116,
      },
      {
        lat: 34.894589211606906,
        lng: 32.368048541107314,
      },
      {
        lat: 34.89450341297903,
        lng: 32.3681906981851,
      },
      {
        lat: 34.89446161361505,
        lng: 32.3680458588983,
      },
      {
        lat: 34.89437581485393,
        lng: 32.3681906981851,
      },
      {
        lat: 34.89433181545447,
        lng: 32.36801903680815,
      },
      {
        lat: 34.894177817370846,
        lng: 32.367992214718,
      },
      {
        lat: 34.89427021625566,
        lng: 32.36788224414839,
      },
      {
        lat: 34.89417341742134,
        lng: 32.36775618032469,
      },
      {
        lat: 34.894272416227835,
        lng: 32.36765693859114,
      },
      {
        lat: 34.89418881724351,
        lng: 32.3675603790666,
      },
      {
        lat: 34.89425041650338,
        lng: 32.367412857570784,
      },
      {
        lat: 34.8941294179135,
        lng: 32.36736726001753,
      },
      {
        lat: 34.89418881724351,
        lng: 32.36721437410368,
      },
      {
        lat: 34.89406561858525,
        lng: 32.36719023422255,
      },
      {
        lat: 34.89411401808018,
        lng: 32.367002479591505,
      },
      {
        lat: 34.893979819410525,
        lng: 32.3671097679521,
      },
      {
        lat: 34.89390896654879,
        lng: 32.36700516180052,
      },
      {
        lat: 34.89384956701641,
        lng: 32.36712586120619,
      },
      {
        lat: 34.89376596760177,
        lng: 32.36702125505461,
      },
      {
        lat: 34.89369556802874,
        lng: 32.36714731887831,
      },
      {
        lat: 34.8936063289508,
        lng: 32.36700902137546,
      },
      {
        lat: 34.89354252921631,
        lng: 32.367121674154085,
      },
      {
        lat: 34.89354252921634,
        lng: 32.36692319068698,
      },
      {
        lat: 34.89346112948314,
        lng: 32.366995610330385,
      },
      {
        lat: 34.89348092942567,
        lng: 32.36680785569934,
      },
      {
        lat: 34.893384129661335,
        lng: 32.36688295755176,
      },
      {
        lat: 34.8934083296131,
        lng: 32.3666925207117,
      },
      {
        lat: 34.89332252975189,
        lng: 32.366754211519044,
      },
      {
        lat: 34.8933687296883,
        lng: 32.36655841026096,
      },
      {
        lat: 34.89326752979373,
        lng: 32.366579867933076,
      },
      {
        lat: 34.89329832977485,
        lng: 32.366392113302034,
      },
      {
        lat: 34.89320812979758,
        lng: 32.366469897363466,
      },
      {
        lat: 34.89323452980116,
        lng: 32.36632237586765,
      },
      {
        lat: 34.89314652975618,
        lng: 32.366333104703706,
      },
      {
        lat: 34.89327495398764,
        lng: 32.36620241934557,
      },
      {
        lat: 34.8931847539847,
        lng: 32.36614609295626,
      },
      {
        lat: 34.89335635390528,
        lng: 32.366079037730884,
      },
      {
        lat: 34.8932617539934,
        lng: 32.36599052483339,
      },
      {
        lat: 34.89330795396398,
        lng: 32.36589128309984,
      },
      {
        lat: 34.893186953985946,
        lng: 32.3658832364728,
      },
      {
        lat: 34.89322655399838,
        lng: 32.36576253706713,
      },
      {
        lat: 34.89311215391039,
        lng: 32.36576521927614,
      },
      {
        lat: 34.89312095392282,
        lng: 32.36562306219835,
      },
      {
        lat: 34.8930153537115,
        lng: 32.36566597754259,
      },
      {
        lat: 34.892878953237705,
        lng: 32.36562037998934,
      },
      {
        lat: 34.89292273206048,
        lng: 32.365789200468576,
      },
      {
        lat: 34.892806131538016,
        lng: 32.36574896733335,
      },
      {
        lat: 34.89283913170267,
        lng: 32.36591258208326,
      },
      {
        lat: 34.89273353112911,
        lng: 32.36589917103819,
      },
      {
        lat: 34.892746731208234,
        lng: 32.366052056952036,
      },
      {
        lat: 34.89265433060986,
        lng: 32.36598768393568,
      },
      {
        lat: 34.89262573040359,
        lng: 32.3661539808946,
      },
      {
        lat: 34.892546529780425,
        lng: 32.36604401032499,
      },
      {
        lat: 34.89251243981298,
        lng: 32.366184652274995,
      },
      {
        lat: 34.89240903884157,
        lng: 32.3661310080947,
      },
      {
        lat: 34.89240683881951,
        lng: 32.366316080516725,
      },
      {
        lat: 34.89231663786341,
        lng: 32.36626243633643,
      },
      {
        lat: 34.89234303815347,
        lng: 32.366426051086336,
      },
      {
        lat: 34.89224623704836,
        lng: 32.36650651735678,
      },
      {
        lat: 34.892387038618104,
        lng: 32.36656016153708,
      },
      {
        lat: 34.8922990376653,
        lng: 32.366678178733736,
      },
      {
        lat: 34.89247283945634,
        lng: 32.36669158977881,
      },
      {
        lat: 34.892393638685775,
        lng: 32.36682301802054,
      },
      {
        lat: 34.89256084022297,
        lng: 32.366831064647585,
      },
      {
        lat: 34.89254324007717,
        lng: 32.36699736160651,
      },
      {
        lat: 34.89267304106371,
        lng: 32.36693298859015,
      },
      {
        lat: 34.892657640957374,
        lng: 32.36715024752036,
      },
      {
        lat: 34.89279844182204,
        lng: 32.36701077265158,
      },
      {
        lat: 34.892756641590545,
        lng: 32.367219984954744,
      },
      {
        lat: 34.892879842211826,
        lng: 32.36712878984824,
      },
      {
        lat: 34.89277644170287,
        lng: 32.36730581564322,
      },
      {
        lat: 34.89289964229447,
        lng: 32.367335319942384,
      },
      {
        lat: 34.89280284184517,
        lng: 32.36743724388495,
      },
      {
        lat: 34.89293484242954,
        lng: 32.3675177101554,
      },
      {
        lat: 34.89284464205317,
        lng: 32.36761695188895,
      },
      {
        lat: 34.89299424262332,
        lng: 32.36776179117575,
      },
      {
        lat: 34.89285564210436,
        lng: 32.36787980837241,
      },
      {
        lat: 34.89302646334794,
        lng: 32.3680027853684,
      },
      {
        lat: 34.89285926275837,
        lng: 32.36806447617574,
      },
      {
        lat: 34.892938463080064,
        lng: 32.368177128954365,
      },
      {
        lat: 34.89274926218493,
        lng: 32.3682200442986,
      },
      {
        lat: 34.89279986246701,
        lng: 32.36835683695836,
      },
      {
        lat: 34.892648061527304,
        lng: 32.36838902346654,
      },
      {
        lat: 34.89264486924549,
        lng: 32.368527429123915,
      },
      {
        lat: 34.892523868290866,
        lng: 32.368538157959975,
      },
      {
        lat: 34.89250186809814,
        lng: 32.36871786596397,
      },
      {
        lat: 34.89238306695562,
        lng: 32.36868836166481,
      },
      {
        lat: 34.89240726720229,
        lng: 32.36885197641472,
      },
      {
        lat: 34.89230826614816,
        lng: 32.36885734083275,
      },
      {
        lat: 34.892374266864174,
        lng: 32.36895926477531,
      },
      {
        lat: 34.892268386643806,
        lng: 32.36901784811245,
      },
      {
        lat: 34.89239378801976,
        lng: 32.36905271682964,
      },
      {
        lat: 34.89242568833927,
        lng: 32.36916939292179,
      },
      {
        lat: 34.89250488907894,
        lng: 32.3691345242046,
      },
      {
        lat: 34.8925169891852,
        lng: 32.36923376593815,
      },
      {
        lat: 34.892592889811226,
        lng: 32.369204261638984,
      },
      {
        lat: 34.892582989733555,
        lng: 32.369298138954505,
      },
      {
        lat: 34.89267209038971,
        lng: 32.36928472790943,
      },
      {
        lat: 34.89263469012607,
        lng: 32.36939469847904,
      },
      {
        lat: 34.89270839062935,
        lng: 32.36941213283764,
      },
      {
        lat: 34.89264162783097,
        lng: 32.369508639305735,
      },
      {
        lat: 34.89266252797862,
        lng: 32.369629338711405,
      },
      {
        lat: 34.892585028048124,
        lng: 32.36969191535587,
      },
      {
        lat: 34.89261033697672,
        lng: 32.36981647690899,
      },
      {
        lat: 34.8925333925905,
        lng: 32.369964066962766,
      },
      {
        lat: 34.892629093349164,
        lng: 32.37008744857745,
      },
      {
        lat: 34.892582892996806,
        lng: 32.370232287864255,
      },
      {
        lat: 34.892732494043585,
        lng: 32.37026983879046,
      },
      {
        lat: 34.892805629255456,
        lng: 32.37041670826656,
      },
      {
        lat: 34.89296000445262,
        lng: 32.3704370252955,
      },
      {
        lat: 34.893056804716714,
        lng: 32.37059661673189,
      },
      {
        lat: 34.89325163496515,
        lng: 32.37059761314468,
      },
      {
        lat: 34.893357584375664,
        lng: 32.37080098474748,
      },
      {
        lat: 34.8935236839549,
        lng: 32.3708586522413,
      },
      {
        lat: 34.89359056898102,
        lng: 32.3709238029847,
      },
      {
        lat: 34.893655468672534,
        lng: 32.370762870443805,
      },
      {
        lat: 34.893786946727445,
        lng: 32.370818373362866,
      },
      {
        lat: 34.89388596622629,
        lng: 32.37067124560845,
      },
      {
        lat: 34.894066364593336,
        lng: 32.37079194501412,
      },
      {
        lat: 34.89415876360352,
        lng: 32.37066051677239,
      },
      {
        lat: 34.894298461909656,
        lng: 32.370814743790746,
      },
      {
        lat: 34.89446015965242,
        lng: 32.37069002107155,
      },
      {
        lat: 34.89457565784526,
        lng: 32.370809379372716,
      },
      {
        lat: 34.89474505490103,
        lng: 32.370668563399434,
      },
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
  const [heading, setHeading] = createSignal<number | null>(null);
  const [trackPosition, setTrackPosition] = createSignal(false);

  let polylines: Map<string, google.maps.Polyline> = new Map();
  let markers: Map<string, google.maps.Marker[]> = new Map();
  let currentLocationMarker: google.maps.Marker | undefined;
  let isDragging = false;
  let currentRotation = 0; // Current displayed rotation
  let targetRotation = 0; // Target rotation from sensor
  let rotationAnimationInterval: number | null = null;
  const ANIMATION_FPS = 10; // Max 10 updates per second
  const ANIMATION_INTERVAL = 1000 / ANIMATION_FPS; // 100ms
  let lastPanTime = 0; // Track last time map was panned
  const PAN_THROTTLE = 1000; // Only pan once per second

  // Calculate shortest rotation angle (handles 0-360 wrap-around)
  const getShortestAngle = (from: number, to: number): number => {
    let diff = to - from;
    // Normalize to [-180, 180]
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    return diff;
  };

  // Smooth rotation animation
  const animateRotation = () => {
    if (!currentLocationMarker) return;

    const diff = getShortestAngle(currentRotation, targetRotation);
    const easingFactor = 0.15; // Adjust for faster/slower easing (0.1 = slower, 0.3 = faster)

    // Move current rotation towards target
    currentRotation += diff * easingFactor;

    // Normalize to [0, 360)
    currentRotation = ((currentRotation % 360) + 360) % 360;

    // Update marker icon with new rotation
    const location = currentLocation();
    if (location) {
      const icon = {
        path: "M 0,-24 L 12,12 L 0,6 L -12,12 Z",
        fillColor: "#4285F4",
        fillOpacity: 0.9,
        strokeColor: "#ffffff",
        strokeWeight: 2,
        scale: 1,
        rotation: currentRotation,
        anchor: new google.maps.Point(0, 0),
      };
      currentLocationMarker.setIcon(icon);
    }

    // Stop animation if we've reached the target (within threshold)
    if (Math.abs(diff) < 0.1) {
      if (rotationAnimationInterval !== null) {
        clearInterval(rotationAnimationInterval);
        rotationAnimationInterval = null;
      }
    }
  };

  // Load paths from localStorage on mount
  onMount(() => {
    // Load edit mode setting
    const editMode = localStorage.getItem(EDIT_MODE_KEY);
    setEditModeEnabled(editMode === "true");

    // Check for hash in URL (e.g., #1, #2)
    const hash = window.location.hash.replace("#", "");
    const pathIndex = hash ? parseInt(hash, 10) - 1 : 0;

    // If we're in edit mode, show all paths
    if (editMode === "true") {
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
    } else {
      // Not in edit mode - load path based on hash
      if (pathIndex >= 0 && pathIndex < DEFAULT_PATHS.length) {
        // Load specific path from hash
        const pathToLoad = DEFAULT_PATHS[pathIndex];
        setPaths([pathToLoad]);
        setSelectedPathId(pathToLoad.id);
      } else {
        // Invalid hash, load first default path
        const pathToLoad = DEFAULT_PATHS[0];
        setPaths([pathToLoad]);
        setSelectedPathId(pathToLoad.id);
      }
    }

    // Listen for hash changes to reload paths
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      const newPathIndex = newHash ? parseInt(newHash, 10) : 0;

      if (
        !editModeEnabled() &&
        newPathIndex >= 0 &&
        newPathIndex < DEFAULT_PATHS.length
      ) {
        const pathToLoad = DEFAULT_PATHS[newPathIndex];
        setPaths([pathToLoad]);
        setSelectedPathId(pathToLoad.id);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

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

    // Request device orientation permission (required on iOS 13+)
    const requestOrientationPermission = async () => {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        try {
          const permission = await (
            DeviceOrientationEvent as any
          ).requestPermission();
          if (permission === "granted") {
            setupOrientationListener();
          }
        } catch (error) {
          console.error("Error requesting orientation permission:", error);
        }
      } else {
        // Non-iOS devices or older iOS versions
        setupOrientationListener();
      }
    };

    const setupOrientationListener = () => {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        // Use absolute heading if available (compass), otherwise use alpha
        const compassHeading = event.webkitCompassHeading || event.alpha;
        if (compassHeading !== null) {
          // webkitCompassHeading gives degrees from north (0-360)
          // alpha gives rotation around z-axis (0-360)
          // For webkitCompassHeading: 0 = North, 90 = East, 180 = South, 270 = West
          // For alpha: we need to invert it (360 - alpha) to match compass direction
          const heading =
            event.webkitCompassHeading !== undefined
              ? event.webkitCompassHeading
              : 360 - (compassHeading as number);
          setHeading(heading);
        }
      };

      window.addEventListener(
        "deviceorientationabsolute",
        handleOrientation as any,
        true,
      );
      window.addEventListener("deviceorientation", handleOrientation);
    };

    // Start orientation tracking
    requestOrientationPermission();

    // Load API key from environment
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
    setApiKey(key);

    // Remove Google Maps development warnings using MutationObserver
    const removeWarnings = (element: HTMLElement) => {
      // Check for span elements
      if (element.nodeName === "SPAN") {
        const span = element as HTMLSpanElement;
        if (span.innerText.trim() === "For development purposes only") {
          span.innerText = "";
        }
        if (
          span.innerText.trim() === "For development purposes only" ||
          span.innerText.trim() ===
            "This page can't load Google Maps correctly."
        ) {
          const grandparent = span.parentElement?.parentElement;
          if (grandparent) {
            grandparent.remove();
          }
        }
      }

      // Check for Google gray logo image
      if (element.nodeName === "IMG") {
        const img = element as HTMLImageElement;
        if (
          img.src ===
          "https://maps.gstatic.com/mapfiles/api-3/images/google_gray.svg"
        ) {
          const grandparent = img.parentElement?.parentElement;
          if (grandparent) {
            grandparent.remove();
          }
        }
      }

      // Check for div with semi-transparent black background
      if (element.nodeName === "DIV") {
        const div = element as HTMLDivElement;
        const bgColor = div.style.backgroundColor;
        if (bgColor === "rgba(0, 0, 0, 0.5)" || bgColor === "rgba(0,0,0,0.5)") {
          div.style.backgroundColor = "";
        }
      }
    };

    // Create a MutationObserver to watch for new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is a span, img, or div element
          if (
            node.nodeName === "SPAN" ||
            node.nodeName === "IMG" ||
            node.nodeName === "DIV"
          ) {
            removeWarnings(node as HTMLElement);
          }
          // Check for span, img, and div elements within added nodes
          if (node instanceof Element) {
            node.querySelectorAll("span").forEach((span) => {
              removeWarnings(span as HTMLElement);
            });
            node.querySelectorAll("img").forEach((img) => {
              removeWarnings(img as HTMLElement);
            });
            node.querySelectorAll("div").forEach((div) => {
              removeWarnings(div as HTMLElement);
            });
          }
        });
      });
    });

    // Start observing the document body for added nodes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also clean up any existing warnings on mount
    document.querySelectorAll("span").forEach((span) => {
      removeWarnings(span as HTMLElement);
    });
    document.querySelectorAll("img").forEach((img) => {
      removeWarnings(img as HTMLElement);
    });
    document.querySelectorAll("div").forEach((div) => {
      removeWarnings(div as HTMLElement);
    });

    // Add keyboard shortcut to toggle edit mode (Ctrl+E)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();
        const newEditMode = !editModeEnabled();
        setEditModeEnabled(newEditMode);
        localStorage.setItem(EDIT_MODE_KEY, String(newEditMode));
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
      if (rotationAnimationInterval !== null) {
        clearInterval(rotationAnimationInterval);
      }
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
          label: `${pointIndex + 1}`,
          draggable: isEditing() && isSelected,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: isMarkerSelected ? 13 : isSelected ? 13 : 13,
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

  // Center map on current location when tracking is enabled (throttled to 1 per second)
  createEffect(() => {
    const mapInstance = map();
    const location = currentLocation();

    if (mapInstance && location && trackPosition()) {
      const now = Date.now();
      if (now - lastPanTime >= PAN_THROTTLE) {
        mapInstance.panTo(location);
        lastPanTime = now;
      }
    }
  });

  // Update current location marker
  createEffect(() => {
    const mapInstance = map();
    if (!mapInstance) return;

    const location = currentLocation();
    if (!location) return;

    const currentHeading = heading();

    // Create a directional cone/arrow icon if heading is available
    const icon =
      currentHeading !== null
        ? {
            // Custom SVG path for a cone/arrow pointing up (north)
            path: "M 0,-24 L 12,12 L 0,6 L -12,12 Z",
            fillColor: "#4285F4",
            fillOpacity: 0.9,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 1,
            rotation: currentRotation, // Use current animated rotation
            anchor: new google.maps.Point(0, 0),
          }
        : {
            // Fallback to circle if no heading
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          };

    if (currentLocationMarker) {
      // Update existing marker position
      currentLocationMarker.setPosition(location);

      // If heading changed, start smooth rotation animation
      if (currentHeading !== null && currentHeading !== targetRotation) {
        targetRotation = currentHeading;
        // Start animation if not already running
        if (rotationAnimationInterval === null) {
          rotationAnimationInterval = window.setInterval(
            animateRotation,
            ANIMATION_INTERVAL,
          );
        }
      } else if (currentHeading === null) {
        // If no heading, switch to circle icon
        currentLocationMarker.setIcon(icon);
      }
    } else {
      // Create marker only if it doesn't exist
      if (currentHeading !== null) {
        currentRotation = currentHeading;
        targetRotation = currentHeading;
      }
      currentLocationMarker = new google.maps.Marker({
        position: location,
        map: mapInstance,
        icon: icon,
      });
    }
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

  const handleToggleTracking = () => {
    const newTrackingState = !trackPosition();
    setTrackPosition(newTrackingState);

    const mapInstance = map();
    if (!mapInstance) return;

    if (newTrackingState) {
      // Track position: center on current location if available
      const location = currentLocation();
      if (location) {
        mapInstance.panTo(location);
        lastPanTime = Date.now(); // Reset throttle timer
      }
    } else {
      // Navigate freely: center on default center
      mapInstance.panTo(DEFAULT_CENTER);
    }
  };

  return (
    <div class="app">
      <div class="header">
        <h1>Halloween Tracer</h1>
        <div class="tracking-controls">
          <button
            onClick={handleToggleTracking}
            class={trackPosition() ? "tracking-btn" : "tracking-btn active"}
            title={
              trackPosition()
                ? "Click to navigate freely"
                : "Click to track position"
            }
          >
            {trackPosition() ? "Navigate" : "Tracking"}
          </button>
        </div>
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
                disabled={
                  !selectedPath() || selectedPath()!.points.length === 0
                }
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
