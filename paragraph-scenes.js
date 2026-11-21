// Illustrative models for specific textbook passages. One slider = one experimental change.
// Each draw returns a learner-readable observation as well as SVG (no motion required).
const paragraphScenes = {
  '8.33': {
    page:205, name:['Опыт Эрстеда','Oersted’s experiment','Эрстед тәжірибесі'],
    instruction:['Провод над компасом направлен с юга на север. Измени ток и следи за северным концом стрелки. Схема учитывает постоянное поле Земли.', 'The wire above the compass runs south to north. Vary the current and watch the north tip. The model includes a constant terrestrial field.', 'Компас үстіндегі сым оңтүстіктен солтүстікке бағытталған. Токты өзгертіп, тілшенің солтүстік ұшын бақыла. Жер өрісі тұрақты.'],
    axis:'I (A)',min:-3,max:3,step:1,start:0,
    draw(i){const a=-Math.atan(i)*180/Math.PI;return [`I = ${i} A; θ = ${a.toFixed(0)}°`, `<circle cx="155" cy="72" r="48" fill="#edf3ef"/><path d="M155 15V130" stroke="#82746c" stroke-dasharray="4 3"/><text x="150" y="15">N</text><g transform="rotate(${a} 155 72)"><path d="M155 31l-7 41 7 6 7-6z" fill="#ac4d32"/><path d="M155 113l-7-41 7-6 7 6z" fill="#315463"/></g>`]}
  },
  '9.36': {
    page:211,name:['Опыт Резерфорда: экран','Rutherford’s scattering screen','Резерфорд тәжірибесі: экран'],
    instruction:['Сравни два наблюдения: 0 — без фольги, 1 — с фольгой. Следы схематичны: их число не задаёт вероятность. Найди редкое отклонение назад.', 'Compare 0 (no foil) with 1 (foil). The tracks are schematic; their number does not indicate probability. Find the rare backward deflection.', '0 — фольгасыз, 1 — фольгамен. Іздер сұлбалық, саны ықтималдықты көрсетпейді. Сирек кері шашырауды тап.'],axis:['Фольга','Foil','Фольга'],min:0,max:1,step:1,start:0,
    draw(on){const ends=on?[[291,45],[291,62],[291,80],[291,105],[84,124]]:[[291,48],[291,60],[291,72],[291,84],[291,96]];return [on?['Большинство частиц проходит вперёд; возможны большие отклонения.','Most particles continue forward; large deviations are possible.','Бөлшектердің көбі алға өтеді; үлкен ауытқу мүмкін.']:['Без фольги пучок не рассеивается.','Without foil the beam is not scattered.','Фольгасыз шоқ шашырамайды.'],`${on?'<rect x="154" y="20" width="5" height="95" fill="#aa8654"/>':''}${ends.map(([x,y],i)=>`<path d="M22 ${48+12*i}H155L${x} ${y}" stroke="#397078" fill="none"/><circle cx="${x}" cy="${y}" r="3" fill="#ad5137"/>`).join('')}`]}
  },
  '10.15': {
    page:84,name:['Два сечения трубки тока','Two sections of a stream tube','Ағын түтігінің екі қимасы'],
    instruction:['Сужай второе сечение. Вода течёт стационарно в горизонтальной трубе без потерь. Высота водяного столба показывает избыточное давление.','Narrow the second section. Water flows steadily in a horizontal lossless pipe. The water columns indicate gauge pressure.','Екінші қиманы тарылт. Су көлденең құбырмен шығынсыз тұрақты ағады. Су бағанының биіктігі артық қысымды көрсетеді.'],axis:'S₂ (cm²)',min:1,max:4,step:1,start:4,
    draw(s){const v=4/s,dp=(v*v-1)/2;const y=106-s*3;return [`S₁ = 4 cm²; v₁ = 1 m/s; v₂ = ${+v.toFixed(2)} m/s; p₁ − p₂ = ${+dp.toFixed(2)} kPa`, `<path d="M20 94H112L188 ${y}H304V${212-y}H188L112 118H20Z" fill="#c3dce0" stroke="#42636b"/><path d="M57 26V94 M238 ${26+dp*7}V${y}" stroke="#4793a3" stroke-width="8"/><text x="40" y="137">S₁</text><text x="227" y="137">S₂</text>`]}
  },
  '11.9': {
    page:51,name:['Настройка резонанса','Tuning to resonance','Резонансқа баптау'],
    instruction:['Изменяй частоту источника при постоянном напряжении. Найди максимум тока и сравни сопротивления катушки и конденсатора.','Vary the source frequency at fixed voltage. Locate the maximum current and compare the inductive and capacitive reactances.','Кернеу тұрақты кезде жиілікті өзгерт. Ток максимумын тауып, индуктивтік және сыйымдылық кедергілерді салыстыр.'],axis:'ω (rad/s)',min:5,max:20,step:1,start:5,
    draw(w){const xl=w,xc=100/w,I=6/Math.hypot(2,xl-xc);return [`R = 2 Ω; L = 1 H; C = 0.01 F; U = 6 V; I = ${+I.toFixed(2)} A`,[[`Xʟ = ${xl} Ω`,xl],[`Xc = ${+xc.toFixed(2)} Ω`,xc],[`I = ${+I.toFixed(2)} A`,I*6]].map(([label,n],i)=>`<text x="8" y="${34+38*i}">${label}</text><rect x="110" y="${20+38*i}" width="${n*9}" height="18" fill="${i===2?'#ab583c':'#49747b'}"/>`).join('')]}
  }
};
paragraphScenes['7.1'] = {
  page:6,name:['Тело, вещество, явление','Object, substance, phenomenon','Дене, зат, құбылыс'],
  instruction:['Проследи за ледяным кубиком. Кубик — физическое тело, вода — вещество. При плавлении меняется форма тела и агрегатное состояние, но не состав вещества. Шкала показывает долю растаявшего льда, а не температуру.','Follow an ice cube. The cube is an object and water is its substance. Melting changes shape and phase, not composition. The scale shows the fraction melted, not temperature.','Мұз текшесін бақыла. Текше — физикалық дене, су — зат. Балқу пішін мен агрегаттық күйді өзгертеді, зат құрамы сақталады. Шкала температураны емес, еріген үлесті көрсетеді.'],axis:['Растаяло (%)','Melted (%)','Еріген үлес (%)'],min:0,max:100,step:10,start:0,
  draw(p){const edge=60*Math.cbrt(1-p/100);return [`H₂O(s): ${100-p}%    H₂O(l): ${p}%`, `<path d="M72 20v100h175V20" stroke="#476875" fill="none" stroke-width="3"/><rect x="74" y="${118-p*.32}" width="171" height="${p*.32}" fill="#94c5d0"/><rect x="${159-edge/2}" y="${118-edge-p*.04}" width="${edge}" height="${edge}" rx="3" fill="#d4eaf0" stroke="#628b98"/>`]}
};
