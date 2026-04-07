// Curated dictionary of common English words grouped by length
// This is a client-side dictionary for instant validation

const WORDS_3: string[] = [
  "ace","act","add","age","ago","aid","aim","air","all","and","ant","any","ape","arc","are","ark","arm","art","ask","ate",
  "bad","bag","ban","bar","bat","bay","bed","bet","bid","big","bin","bit","bow","box","boy","bud","bug","bun","bus","but","buy",
  "cab","can","cap","car","cat","cop","cow","cry","cub","cup","cur","cut",
  "dad","dam","day","did","dig","dim","dip","dog","dot","dry","dub","dud","due","dug","dun","duo","dye",
  "ear","eat","eel","egg","ego","elm","end","era","eve","ewe","eye",
  "fan","far","fat","fax","fed","fee","few","fig","fin","fir","fit","fix","fly","fob","foe","fog","fop","for","fox","fry","fun","fur",
  "gab","gag","gal","gap","gas","gel","gem","get","gig","gin","gnu","god","got","gum","gun","gut","guy","gym",
  "had","ham","has","hat","hay","hen","her","hew","hid","him","hip","his","hit","hob","hog","hop","hot","how","hub","hue","hug","hum","hut",
  "ice","icy","ill","imp","ink","inn","ion","ire","irk","ivy",
  "jab","jag","jam","jar","jaw","jay","jet","jig","job","jog","jot","joy","jug","jut",
  "keg","ken","key","kid","kin","kit",
  "lab","lad","lag","lap","law","lay","lea","led","leg","let","lid","lie","lip","lit","log","lot","low","lug",
  "mad","man","map","mar","mat","maw","may","men","met","mid","mix","mob","mod","mom","mop","mow","mud","mug","mum","mut",
  "nab","nag","nap","net","new","nil","nip","nit","nod","nor","not","now","nub","nun","nut",
  "oak","oar","oat","odd","ode","off","oft","oil","old","one","opt","orb","ore","our","out","owe","owl","own",
  "pad","pal","pan","pap","par","pat","paw","pay","pea","peg","pen","pep","per","pet","pew","pie","pig","pin","pit","ply","pod","pop","pot","pow","pro","pry","pub","pug","pun","pup","pus","put",
  "rag","ram","ran","rap","rat","raw","ray","red","ref","rib","rid","rig","rim","rip","rob","rod","roe","rot","row","rub","rug","rum","run","rut","rye",
  "sac","sad","sag","sap","sat","saw","say","sea","set","sew","shy","sin","sip","sir","sis","sit","six","ski","sky","sly","sob","sod","son","sop","sot","sow","soy","spa","spy","sty","sub","sue","sum","sun","sup",
  "tab","tad","tag","tan","tap","tar","tat","tax","tea","ten","the","thy","tic","tie","tin","tip","toe","ton","too","top","tot","tow","toy","try","tub","tug","tun","two",
  "ugh","urn","use",
  "van","vat","vet","vex","via","vie","vim","vow",
  "wad","wag","war","was","wax","way","web","wed","wet","who","why","wig","win","wit","woe","wok","won","woo","wow",
  "yak","yam","yap","yaw","yea","yes","yet","yew","you","yow",
  "zap","zed","zen","zig","zip","zoo"
];

const WORDS_4: string[] = [
  "able","ache","acid","acre","aged","aide","ally","also","arch","area","army","aunt","avid","away","axle",
  "back","bade","bail","bait","bake","bald","bale","ball","band","bane","bang","bank","bare","bark","barn","base","bath","bead","beak","beam","bean","bear","beat","beds","beef","been","beer","bell","belt","bend","bent","best","bill","bind","bird","bite","blew","blow","blue","blur","boar","boat","body","bold","bolt","bomb","bond","bone","book","boom","boot","bore","born","boss","both","bout","bowl","bred","brew","bulk","bull","bump","burn","bury","bush","bust","busy","buzz",
  "cafe","cage","cake","calf","call","calm","came","camp","cane","cape","card","care","cart","case","cash","cast","cave","cell","chat","chef","chin","chip","chop","cite","city","clad","clam","clan","clap","claw","clay","clip","clod","clog","club","clue","coal","coat","code","coil","coin","cold","cole","colt","comb","come","cone","cook","cool","cope","copy","cord","core","cork","corn","cost","cosy","coup","cove","cowl","crab","crew","crop","crow","cube","cult","curb","curd","cure","curl","cute",
  "dale","dame","damp","dane","dare","dark","darn","dart","dash","data","date","dawn","days","dead","deaf","deal","dear","debt","deck","deed","deem","deep","deer","demo","dent","deny","desk","dial","dice","died","diet","digs","dime","dine","dire","dirt","disc","dish","disk","dock","does","doll","dome","done","doom","door","dose","dote","down","drag","draw","drew","drip","drop","drug","drum","dual","dub","duck","dude","duel","duet","duke","dull","dumb","dump","dune","dung","dunk","dupe","dusk","dust","duty",
  "each","earl","earn","ease","east","easy","edge","edit","emit","envy","epic","even","ever","evil","exam","exit","eyed","eyes",
  "face","fact","fade","fail","fair","fake","fall","fame","fang","fare","farm","fast","fate","fawn","fear","feat","feed","feel","feet","fell","felt","fend","fern","feud","file","fill","film","find","fine","fire","firm","fish","fist","five","flag","flak","flap","flat","flaw","flea","fled","flew","flip","flit","flog","flow","foam","foal","foes","foil","fold","folk","fond","font","food","fool","foot","ford","fore","fork","form","fort","foul","four","fowl","free","frog","from","fuel","full","fume","fund","furl","fury","fuse","fuss","fuzz",
  "gait","gale","gall","game","gape","garb","gash","gasp","gate","gave","gaze","gear","gene","gift","gild","gill","gist","give","glad","glee","glen","glib","glob","glow","glue","glum","glut","gnat","gnaw","goad","goat","goes","gold","golf","gone","good","gore","gown","grab","gram","gray","grew","grid","grim","grin","grip","grit","grow","grub","gulp","guru","gush","gust",
  "hack","hail","hair","hale","half","hall","halt","hand","hang","hare","harm","harp","hash","haste","hate","haul","have","hawk","haze","hazy","head","heal","heap","hear","heat","heed","heel","held","hell","helm","help","herd","here","hero","hide","high","hike","hill","hilt","hind","hint","hire","hiss","hive","hoax","hock","hoed","hoes","hold","hole","holy","home","hone","hood","hook","hoop","hope","horn","hose","host","hour","howl","hubs","hued","hues","huge","hull","hump","hung","hunt","hurl","hurt","hush","hymn",
  "icon","idea","idle","idol",
  "jack","jade","jail","jamb","jars","java","jaws","jazz","jean","jeer","jerk","jest","jobs","join","joke","jolt","jots","jump","june","junk","jury","just","jute",
  "keel","keen","keep","kelp","kept","keys","kick","kids","kill","kind","king","kiss","kite","knack","knee","knew","knit","knob","knot","know",
  "lace","lack","lacy","laid","lair","lake","lamb","lame","lamp","land","lane","lard","lark","lash","lass","last","late","lawn","lazy","lead","leaf","leak","lean","leap","left","lend","lens","less","lest","lick","lied","lies","life","lift","like","lily","limb","lime","limp","line","link","lion","lips","list","live","load","loaf","loan","lock","lode","loft","logo","lone","long","look","loom","loop","loot","lord","lore","lose","loss","lost","lots","loud","love","luck","lull","lump","lung","lure","lurk","lush","lust",
  "mace","made","maid","mail","main","make","male","mall","malt","mane","many","mare","mark","mars","mash","mask","mass","mast","mate","maze","mead","meal","mean","meat","meet","meld","melt","memo","mend","menu","mere","mesh","mess","mice","mild","mile","milk","mill","mime","mind","mine","mint","mire","miss","mist","mite","moan","moat","mock","mode","mold","mole","molt","monk","mood","moon","moor","more","morn","moss","most","moth","move","much","muck","mule","mull","muse","mush","musk","must","mute",
  "nail","name","nape","navy","near","neat","neck","need","nest","nets","news","next","nice","nick","nine","node","none","noon","norm","nose","note","noun","nude","numb","nuts",
  "oath","obey","odds","odor","okay","omen","omit","once","only","onto","opal","open","opts","oral","orca","oven","over","owed","owes","owls","owns",
  "pace","pack","page","paid","pail","pain","pair","pale","palm","pane","pang","pare","park","part","pass","past","path","pave","pawn","peak","peal","pear","peas","peat","peck","peel","peer","pelt","pend","pens","perk","pest","pick","pier","pike","pile","pill","pine","pink","pint","pipe","plan","play","plea","plod","plot","plow","ploy","plug","plum","plus","pock","poem","poet","poke","pole","poll","polo","pomp","pond","pony","pool","poor","pope","pops","pore","pork","port","pose","post","pour","pout","pray","prep","prey","prod","prop","prow","prune","puff","pull","pulp","pump","punk","pure","push",
  "quit","quiz",
  "race","rack","raft","rage","raid","rail","rain","rake","ramp","rang","rank","rant","rare","rash","rate","rave","rays","read","real","ream","reap","rear","reed","reef","reel","rein","rely","rend","rent","rest","rice","rich","ride","rift","rile","rill","rind","ring","riot","ripe","rise","risk","road","roam","roar","robe","rock","rode","role","roll","roof","room","root","rope","rose","rosy","rote","rout","rove","rude","ruin","rule","rump","rung","runs","runt","ruse","rush","rust",
  "sack","safe","sage","said","sail","sake","sale","salt","same","sand","sane","sang","sank","sash","save","says","scab","scan","scar","seal","seam","seat","sect","seed","seek","seem","seen","self","sell","semi","send","sent","sept","sew","shed","shin","ship","shoe","shoo","shop","shot","show","shut","sick","side","sift","sigh","sign","silk","sill","silt","sine","sing","sink","sire","site","size","skid","skim","skin","skip","skit","slab","slag","slam","slap","slat","sled","slew","slid","slim","slit","slob","slop","slot","slow","slug","slum","slur","smog","snap","snag","snip","snob","snot","snow","snub","snug","soak","soap","soar","sock","soda","sofa","soft","soil","sold","sole","some","song","soon","soot","sore","sort","soul","soup","sour","span","spar","spec","sped","spin","spit","spot","spry","spud","spur","stab","stag","star","stay","stem","step","stew","stir","stop","stub","stud","stun","such","suck","suit","sulk","sump","sung","sunk","sure","surf","swan","swap","swim","swum",
  "tabs","tack","tact","tail","take","tale","talk","tall","tame","tang","tank","tape","taps","tarn","tarp","task","taxi","teak","teal","team","tear","teem","tell","tend","tens","tent","term","test","text","than","that","them","then","they","thin","this","thou","tick","tide","tidy","tied","tier","ties","tile","till","tilt","time","tine","tint","tiny","tire","toad","tock","toed","toes","toil","told","toll","tomb","tome","tone","tons","took","tool","tops","tore","torn","tort","toss","tour","town","trap","tray","tree","trek","trim","trio","trip","trod","trot","true","tuba","tube","tuck","tuft","tuna","tune","turf","turn","tusk","tuft","twin","type",
  "ugly","undo","unit","unto","upon","urge","used","user","uses",
  "vain","vale","vane","vary","vase","vast","veal","veer","veil","vein","vent","verb","very","vest","veto","vial","vice","view","vine","void","volt","vote","vows",
  "wade","wage","wail","wait","wake","walk","wall","wand","want","ward","warm","warn","warp","wart","wary","wash","wasp","wave","wavy","waxy","ways","weak","wean","wear","weed","week","well","welt","went","wept","were","west","what","when","whim","whip","whom","wick","wide","wife","wild","will","wilt","wily","wimp","wind","wine","wing","wink","wipe","wire","wise","wish","wisp","with","wits","woke","wolf","womb","wood","wool","word","wore","work","worm","worn","wove","wrap","wren",
  "yank","yard","yarn","year","yell","yoga","yoke","your",
  "zeal","zero","zest","zinc","zone","zoom"
];

const WORDS_5: string[] = [
  "about","above","abuse","actor","acute","admit","adopt","adult","after","again","agent","agree","ahead","alarm","alien","align","alive","alley","allow","alone","along","alter","among","angel","anger","angle","angry","anime","ankle","annex","apart","apple","arena","argue","arise","armor","array","aside","asset","atlas","avoid","awake","award","aware",
  "badge","basic","basin","basis","batch","beach","beast","begin","being","below","bench","bible","birth","black","blade","blame","bland","blank","blast","blaze","bleak","bleed","blend","bless","blind","blink","bliss","block","blood","bloom","blown","board","boast","bonus","boost","booth","bound","brain","brand","brave","bread","break","breed","brick","bride","brief","bring","broad","broke","brook","brown","brush","buddy","build","built","bunch","burst","buyer",
  "cabin","cable","camel","candy","cargo","carry","catch","cause","cedar","chain","chair","chalk","champ","chaos","charm","chart","chase","cheap","cheat","check","cheek","cheer","chess","chest","chief","child","chill","choir","chose","chunk","civil","claim","class","clean","clear","clerk","cliff","climb","cling","clock","clone","close","cloth","cloud","coach","coast","color","comet","comma","coral","count","court","cover","crack","craft","crane","crash","crazy","cream","creek","creep","crest","crime","cross","crowd","crown","cruel","crush","cubic","curve","cycle",
  "daily","dance","death","debug","debut","decal","decay","decor","decoy","delay","delta","demon","dense","depot","depth","derby","devil","diary","dirty","dizzy","dodge","donor","doubt","dough","draft","drain","drake","drama","drank","drape","drawn","dream","dress","dried","drift","drill","drink","drive","drone","drown","dried","drunk","dryer","dryly","dwarf","dwell",
  "eager","eagle","earth","ease","eight","elder","elect","elite","email","ember","empty","enemy","enjoy","enter","equal","equip","erase","error","essay","event","every","evil","exact","exalt","exam","exert","exile","exist","expel","extra",
  "fable","facet","fagot","faint","fairy","faith","false","fancy","fatal","fault","feast","fence","ferry","fetch","fever","fiber","field","fiery","fight","final","first","flame","flank","flash","fleet","flesh","flick","flies","fling","flint","float","flock","flood","floor","flora","flour","fluid","flush","flute","focal","foggy","force","forge","forth","forum","found","frame","frank","fraud","fresh","front","frost","froze","fruit","fully","funny","fuzzy",
  "giant","given","glass","gleam","glide","globe","gloom","glory","gloss","glove","grace","grade","grain","grand","grant","grape","graph","grasp","grass","grave","graze","great","greed","green","greet","grief","grill","grind","groan","groom","gross","group","grove","grown","guard","guess","guest","guide","guilt","guise",
  "habit","happy","harsh","hasty","haven","heart","heavy","hedge","heist","hence","honey","honor","horse","hotel","house","hover","human","humor","hurry",
  "ideal","image","imply","inbox","index","indie","infer","inner","input","inter","intro","irony","issue","ivory",
  "jewel","joint","joker","jolly","juice","juicy","jumbo","jumpy","juror",
  "knack","kneel","knife","knock","knoll",
  "label","labor","lance","large","laser","latch","later","laugh","layer","learn","lease","least","leave","legal","lemon","level","lever","light","limit","linen","liner","liter","lively","llama","local","lodge","logic","login","loose","lover","lower","loyal","lucky","lunar","lunch","lunge","lyric",
  "macro","magic","major","maker","manor","maple","march","mason","match","maybe","mayor","media","melon","mercy","merge","merit","merry","metal","meter","might","minor","minus","mirth","model","money","month","moose","moral","motor","mound","mount","mouse","mouth","movie","muddy","mural","music","my",
  "naive","nasty","naval","nerve","never","night","noble","noise","north","notch","noted","novel","nurse",
  "oasis","occur","ocean","offer","often","olive","onset","opera","orbit","order","organ","other","ought","outer","owner","oxide",
  "paced","paint","panel","panic","paper","party","pasta","paste","patch","pause","peace","peach","pearl","pedal","penny","phase","phone","photo","piano","piece","pilot","pinch","pitch","pixel","pizza","place","plain","plane","plant","plate","plaza","plead","pluck","plumb","plume","plump","plush","poach","point","polar","porch","poser","pouch","pound","power","press","price","pride","prime","print","prior","prize","probe","prone","proof","proud","prove","proxy","prune","pulse","punch","pupil","purse","pushy",
  "quake","qualm","queen","query","quest","queue","quick","quiet","quirk","quota","quote",
  "radar","radio","rainy","raise","rally","ranch","range","rapid","ratio","reach","ready","realm","rebel","refer","reign","relax","relay","repay","reply","reset","resin","retry","ridge","rifle","right","rigid","risky","rival","river","robin","robot","rocky","rogue","roman","rouge","rough","round","route","royal","rugby","ruler","rumor","rural",
  "sadly","saint","salad","salon","sauce","scale","scare","scene","scent","scope","score","scout","scrap","sense","serve","setup","seven","shade","shake","shame","shape","share","shark","sharp","shave","shear","sheep","sheer","sheet","shelf","shell","shift","shine","shirt","shock","shore","short","shout","shove","shown","shrub","siege","sight","sigma","silly","since","sixth","sixty","sized","skate","skull","slack","slain","slash","slate","slave","sleep","slice","slide","slope","small","smart","smell","smile","smoke","snake","solar","solid","solve","sorry","south","space","spare","spark","spawn","speak","spear","speed","spell","spend","spent","spice","spill","spine","spoke","spoon","sport","spray","squad","stack","staff","stage","stain","stair","stake","stale","stalk","stall","stamp","stand","stare","stark","start","state","stays","steak","steal","steam","steel","steep","steer","stern","stick","stiff","still","sting","stint","stock","stole","stone","stood","stool","store","storm","story","stout","stove","strap","straw","stray","strip","stuck","study","stuff","stump","stung","stunk","style","suite","sunny","super","surge","swamp","swarm","swear","sweat","sweep","sweet","swept","swift","swing","swirl","sword","swore","sworn","swung",
  "table","taste","teach","teeth","tempo","tense","theft","theme","there","these","thick","thief","thing","think","third","thorn","those","three","threw","throw","thumb","tiger","tight","timer","tired","title","today","token","topic","total","touch","tough","tower","toxic","trace","track","trade","trail","train","trait","trash","treat","trend","trial","tribe","trick","troop","truck","truly","trump","trunk","trust","truth","tulip","tumor","tuner","turbo","twice","twist",
  "ultra","uncle","under","undue","union","unite","unity","until","upper","upset","urban","usage","usual","utter",
  "vague","valid","value","valve","vapor","vault","verse","video","vigor","vinyl","viola","virus","visit","vista","vital","vivid","vocal","vodka","voice","voter",
  "waist","waste","watch","water","weary","wedge","weird","whale","wheat","wheel","where","which","while","whine","white","whole","whose","widen","width","witch","woman","world","worry","worse","worst","worth","would","wound","wrath","wreck","wrist","write","wrong","wrote",
  "yacht","yield","young","youth",
  "zebra"
];

const WORDS_6: string[] = [
  "absorb","accept","access","across","acting","action","active","actual","adjust","admire","advise","affair","afford","afraid","agency","agenda","almost","always","amount","anchor","animal","annual","answer","anyway","appeal","appear","arctic","around","arrest","arrive","artist","assert","assign","assist","assume","attach","attack","attend","autumn",
  "backup","banana","banker","banner","barely","basket","battle","beauty","become","before","behave","behind","belong","better","beyond","bishop","bitter","blanch","blanket","blight","bloody","bother","bottom","bounce","branch","breach","breath","bridge","bright","broken","bronze","brutal","bubble","bucket","budget","bumble","bundle","burden","bureau","burner","butter","button",
  "cabin","cable","camera","campus","cancel","candle","carbon","carpet","carrot","castle","casual","cattle","caught","causal","center","chance","change","charge","cheese","cherry","choice","choose","chosen","church","circle","clause","clever","client","clinch","closed","closer","closet","clutch","coffee","collar","colony","column","combat","comedy","coming","common","convey","cookie","copper","corner","costly","cotton","county","couple","course","cousin","create","credit","crisis","custom","cyborg",
  "damage","danger","daring","deadly","dealer","debate","decent","decide","decode","defeat","defend","define","degree","demand","depart","deploy","derive","desert","design","desire","detail","detect","device","devote","differ","dinner","direct","divide","doctor","domain","donate","double","dragon","drawer",
  "easily","eating","effect","effort","eighth","eleven","emerge","empire","employ","enable","endure","energy","engage","engine","enough","ensure","entire","entity","equity","escape","estate","evolve","exceed","except","excuse","exempt","expand","expect","expert","export","expose","extend","extent","fabric",
  "factor","fairly","fallen","family","famine","famous","farmer","father","fathom","faucet","fellow","female","figure","filter","finals","finder","finger","finish","fiscal","flavor","flight","flower","flying","follow","forbid","forced","forest","forever","forget","formal","former","fossil","foster","fourth","freeze","frenzy","frozen","future",
  "gadget","gamble","garage","garden","gather","gazing","gender","genius","gentle","gifted","global","glossy","golden","govern","gravel","ground","growth","guided","guitar","gunman",
  "hammer","handle","happen","hardly","hazard","health","heaven","helped","hereby","hidden","highly","honest","horror","humble","hunger","hunter","hybrid",
  "ignore","impact","import","impose","income","indeed","indoor","inform","inject","injury","insert","inside","insist","insure","intact","intend","invent","invest","invite","island","itself",
  "jacket","jersey","jungle","junior","jargon","jockey","joyful","juggle","jumble","jungle","junior","justic",
  "kernel","kettle","kidney","kindle","kinder","kitten","knight","kosher",
  "ladder","lambda","laptop","lately","launch","lawyer","layout","leader","league","legacy","length","lesson","letter","liable","lights","likely","linear","lineup","liquid","listen","litter","little","lively","locate","locker","lonely","longer","loving","luxury",
  "mainly","manage","manner","marble","margin","market","master","matrix","matter","mature","meadow","medium","member","memory","mental","mentor","merger","method","middle","mighty","miller","minute","mirror","misery","mobile","modern","modest","modify","moment","monkey","mortal","mostly","mother","motion","murder","muscle","museum","mutual","muzzle","myself","mystic",
  "namely","narrow","nation","nature","nearby","nearly","neatly","neural","nicely","nimble","nobody","normal","notice","notify","novice","number","nursed",
  "object","obtain","occupy","offend","office","online","openly","oppose","option","oracle","orange","orient","orphan","outfit","outlet","output","outset",
  "palace","pander","parade","parent","parrot","partly","pastry","patrol","patron","patter","paving","paying","pencil","pepper","permit","person","phrase","pillar","pillow","pirate","planet","player","please","plenty","plunge","pocket","poetry","poison","police","policy","polish","polite","poorly","portal","poster","potato","potent","potion","powder","praise","prayer","prefer","pretty","prince","prison","profit","prompt","proper","proven","public","punish","purple","pursue","puzzle",
  "quaint","quarry","quench","rabbit","racial","racket","random","ranger","rarely","rather","rating","realty","reason","recall","recent","record","reduce","reform","refuse","regard","regime","region","regret","reject","relate","relief","remain","remedy","remote","remove","render","rental","repair","repeat","replay","report","rescue","resign","resist","resort","result","resume","retail","retain","retire","return","reveal","review","revolt","reward","ribbon","ritual","robust","rocket","rotary","router","rubber","ruling",
  "sacred","saddle","safety","salary","salmon","sample","sandal","savage","school","screen","script","search","season","second","secret","sector","secure","select","seller","senior","sequel","serial","series","server","settle","severe","shadow","shield","signal","silent","silver","simple","singer","single","sister","sketch","sleeve","slight","slowly","smooth","snatch","social","sodium","solely","solemn","solver","source","speech","sphere","spider","spiral","spirit","splash","spoken","spread","spring","square","stable","stance","staple","statue","status","steady","stolen","strain","strand","stream","street","stress","strict","strike","string","stroke","strong","struck","studio","submit","subtle","sudden","suffer","summer","summit","super","supply","surely","survey","switch","symbol","syntax","system",
  "tablet","tackle","talent","target","temple","tenant","tender","tennis","theory","thirst","though","thread","thrill","throne","thrown","ticket","timber","tissue","toilet","tongue","toward","travel","treaty","tribal","tricky","triple","trophy","truism","trusty","tumble","tunnel","turtle","twelve","twenty","unique",
  "unfair","unfold","unholy","united","unlike","unlock","unpack","unpaid","unreal","unseen","update","uphold","upload","upside","upward","urgent","useful",
  "vacant","vacuum","valley","vanish","varied","vendor","versus","victim","violin","virtue","vision","visual","volume","vortex",
  "waiter","walker","wallet","wander","warmth","weapon","weekly","weight","wholly","wicked","widely","widget","wield","window","winner","winter","wisdom","wisely","within","wonder","wooden","worker","worthy","writer",
  "yearly","yellow",
  "zealot","zigzag","zombie","zoning"
];

// Build word sets for O(1) lookup
const wordSets: Map<number, Set<string>> = new Map();

function getWordList(length: number): string[] {
  switch (length) {
    case 3: return WORDS_3;
    case 4: return WORDS_4;
    case 5: return WORDS_5;
    case 6: return WORDS_6;
    default: return [];
  }
}

function getWordSet(length: number): Set<string> {
  if (!wordSets.has(length)) {
    wordSets.set(length, new Set(getWordList(length)));
  }
  return wordSets.get(length)!;
}

export function isValidWord(word: string): boolean {
  const w = word.toLowerCase().trim();
  return getWordSet(w.length).has(w);
}

export function getWordsOfLength(length: number): string[] {
  return getWordList(length);
}

export function getAllWordSets(): Map<number, Set<string>> {
  [3, 4, 5, 6].forEach(l => getWordSet(l));
  return wordSets;
}
