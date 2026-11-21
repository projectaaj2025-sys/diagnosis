const panel=document.querySelector('#panel'),title=document.querySelector('#setup h2'),label=document.querySelector('#setup small');
const $=s=>panel.querySelector(s),focusPanel=()=>document.querySelector('#setup').scrollIntoView();
const routes={school:['01','Школьник','По программе 7–11 классов'],adult:['02','Взрослый','Физика повседневной жизни'],olymp:['03','Олимпиада','Модели и нестандартные задачи'],exams:['04','Международные экзамены','IGCSE · Сунын · AP · IB']};
let expanded=false,mode='school',grade=7,ageMode=false,age=13,minutes=20,deck,log,target,item,choice,initialTopics;
let quarter=0;
const scoped=()=>mode==='school'&&!ageMode&&quarter>0;
const examTasks=[
 {
  "exam": "IGCSE",
  "topic": "Измерения",
  "raw": "Толщина стопки из 50 одинаковых карточек равна 12 мм. Найди толщину одной карточки, пренебрегая зазорами.|0.24 мм",
  "unit": "мм",
  "key": 0.24,
  "level": 7,
  "skill": "Расчёт",
  "solution": "Толщина делится на число карточек: 12/50 = 0,24 мм. Измерение стопки уменьшает вклад ошибки шкалы."
 },
 {
  "exam": "IGCSE",
  "topic": "Плотность",
  "raw": "Камень массой 54 г поднял уровень в мензурке с 30 до 48 мл. Какова средняя плотность камня?|3 г/см³",
  "unit": "г/см³",
  "key": 3.0,
  "level": 7,
  "skill": "Расчёт",
  "solution": "Объём равен разности показаний: 18 см³. Плотность 54/18 = 3 г/см³."
 },
 {
  "exam": "IGCSE",
  "topic": "Тепловые явления",
  "raw": "В теплоизолированном сосуде 0,1 кг воды нагрели на 20 °C. Сколько энергии получила вода при c = 4200 Дж/(кг·К)?|8400 Дж",
  "unit": "Дж",
  "key": 8400.0,
  "level": 7,
  "skill": "Расчёт",
  "solution": "Фаза не меняется: Q = cmΔT = 4200·0,1·20 = 8400 Дж."
 },
 {
  "exam": "IGCSE",
  "topic": "Электрический ток",
  "raw": "На одном резисторе напряжение 4,5 В, сопротивление 15 Ом. Найди показание идеального последовательного амперметра.|0.3 А",
  "unit": "А",
  "key": 0.3,
  "level": 7,
  "skill": "Расчёт",
  "solution": "Амперметр пропускает ток ветви: I = U/R = 4,5/15 = 0,3 А."
 },
 {
  "exam": "IGCSE",
  "topic": "Волновое движение",
  "raw": "Гребни проходят мимо буйка с частотой 5 Гц. Волна движется со скоростью 4 м/с. Найди расстояние между соседними гребнями.|0.8 м",
  "unit": "м",
  "key": 0.8,
  "level": 7,
  "skill": "Расчёт",
  "solution": "За один период гребень сдвигается на длину волны: λ = v/f = 4/5 = 0,8 м."
 },
 {
  "exam": "IGCSE",
  "topic": "Энергия",
  "raw": "Мотор получил 240 Дж электрической энергии и поднял груз, совершив 180 Дж полезной работы. Найди КПД в процентах.|75 %",
  "unit": "%",
  "key": 75.0,
  "level": 7,
  "skill": "Расчёт",
  "solution": "КПД = полезная работа / затраченная энергия · 100% = 180/240 · 100% = 75%."
 },
 {
  "exam": "IGCSE",
  "topic": "Оптика",
  "raw": "Луч образует угол 55° с поверхностью плоского зеркала. Каков угол отражения, отсчитанный от нормали?|35 °",
  "unit": "°",
  "key": 35.0,
  "level": 7,
  "skill": "Расчёт",
  "solution": "С нормалью луч образует 90° − 55° = 35°. Угол отражения равен этому углу."
 },
 {
  "exam": "IGCSE",
  "topic": "Работа и мощность",
  "raw": "Подъёмник равномерно поднимает груз весом 90 Н на высоту 2 м за 10 с. Найди полезную мощность.|18 Вт",
  "unit": "Вт",
  "key": 18.0,
  "level": 7,
  "skill": "Расчёт",
  "solution": "Работа против тяжести 90·2 = 180 Дж. Деление на 10 с даёт 18 Вт."
 },
 {
  "exam": "CSAT",
  "topic": "Законы сохранения",
  "raw": "Вправо движется тележка массой 3 кг со скоростью 2 м/с, навстречу ей едет тележка массой 1 кг со скоростью 2 м/с. После сцепления найди скорость по модулю.|1 м/с",
  "unit": "м/с",
  "key": 1.0,
  "level": 9,
  "skill": "Расчёт",
  "solution": "Возьми вправо за плюс. Суммарный импульс 3·2 − 1·2 = 4 кг·м/с. Делим на 4 кг: 1 м/с."
 },
 {
  "exam": "CSAT",
  "topic": "Кинематика",
  "raw": "Скорость тела линейно меняется от +6 до −6 м/с за 4 с. Найди весь путь, а не перемещение.|12 м",
  "unit": "м",
  "key": 12.0,
  "level": 9,
  "skill": "Расчёт",
  "solution": "Две половины графика образуют треугольники с основанием 2 с. Складываем площади по модулю: 2·(6·2/2) = 12 м."
 },
 {
  "exam": "CSAT",
  "topic": "Динамика",
  "raw": "На гладком столе два соприкасающихся бруска массами 1 и 3 кг. Сила 8 Н толкает первый ко второму. Каков модуль силы взаимодействия брусков?|6 Н",
  "unit": "Н",
  "key": 6.0,
  "level": 9,
  "skill": "Расчёт",
  "solution": "Ускорение системы 8/(1+3) = 2 м/с². Второй брусок ускоряет только контактная сила: 3·2 = 6 Н."
 },
 {
  "exam": "CSAT",
  "topic": "Электрический ток",
  "raw": "Резисторы 6 Ом и 3 Ом соединены параллельно с идеальным источником 3 В. Ветвь 6 Ом отключили. Найди мощность оставшейся ветви.|3 Вт",
  "unit": "Вт",
  "key": 3.0,
  "level": 9,
  "skill": "Расчёт",
  "solution": "Напряжение идеального источника не зависит от тока. На 3 Ом остаётся 3 В: P = 3²/3 = 3 Вт."
 },
 {
  "exam": "CSAT",
  "topic": "Термодинамика",
  "raw": "За цикл газ получил 200 Дж от нагревателя и отдал 140 Дж холодильнику. Найди суммарную работу газа.|60 Дж",
  "unit": "Дж",
  "key": 60.0,
  "level": 9,
  "skill": "Расчёт",
  "solution": "В конце цикла внутренняя энергия прежняя. Поэтому работа равна чистой теплоте: 200 − 140 = 60 Дж."
 },
 {
  "exam": "CSAT",
  "topic": "Колебания",
  "raw": "Длину идеального математического маятника увеличили в 16 раз. Во сколько раз возрастёт период малых колебаний при прежнем g?|4 раз",
  "unit": "раз",
  "key": 4.0,
  "level": 9,
  "skill": "Расчёт",
  "solution": "Период пропорционален квадратному корню из длины. Отношение периодов равно √16 = 4."
 },
 {
  "exam": "CSAT",
  "topic": "Волновое движение",
  "raw": "Длина волны уменьшилась от 3 м до 1,5 м в той же среде при неизменной скорости. Изначально частота была 4 Гц. Какова новая частота?|8 Гц",
  "unit": "Гц",
  "key": 8.0,
  "level": 9,
  "skill": "Расчёт",
  "solution": "Скорость была 4·3 = 12 м/с и сохранилась. Новая частота 12/1,5 = 8 Гц."
 },
 {
  "exam": "CSAT",
  "topic": "Энергия",
  "raw": "Тележка потеряла 24 Дж потенциальной энергии при спуске. Из них 9 Дж перешло в тепло. На сколько джоулей выросла кинетическая энергия, если других превращений нет?|15 Дж",
  "unit": "Дж",
  "key": 15.0,
  "level": 9,
  "skill": "Расчёт",
  "solution": "Баланс энергии: потеря потенциальной энергии равна приросту кинетической и нагреву. Получаем 24 − 9 = 15 Дж."
 }
];
examTasks.push(...[
 {
  "exam": "AP Physics 1",
  "topic": "Динамика",
  "raw": "Две тележки массой 2 и 4 кг соединены лёгкой нитью на гладком столе. На систему действует горизонтальная сила 12 Н. Найди ускорение.|2 м/с²",
  "unit": "м/с²",
  "key": 2.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Для системы натяжение внутреннее. Делим внешнюю силу на суммарную массу: 12/(2 + 4) = 2 м/с²."
 },
 {
  "exam": "AP Physics 1",
  "topic": "Энергия",
  "raw": "На гладком спуске тележка из состояния покоя набрала 6 м/с. На сколько снизился её центр масс при g = 10 м/с²? Вращением колёс пренебреги.|1.8 м",
  "unit": "м",
  "key": 1.8,
  "level": 8,
  "skill": "Расчёт",
  "solution": "При отсутствии потерь и без учёта вращения mgh = mv²/2. Масса сокращается: h = 36/20 = 1,8 м."
 },
 {
  "exam": "AP Physics 1",
  "topic": "Законы сохранения",
  "raw": "График силы от времени — треугольник с основанием 0,4 с и высотой 30 Н. Сила всё время положительна. Найди импульс силы.|6 Н·с",
  "unit": "Н·с",
  "key": 6.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Импульс — площадь под графиком: 0,4 · 30 / 2 = 6 Н·с."
 },
 {
  "exam": "AP Physics 1",
  "topic": "Равновесие",
  "raw": "На невесомом горизонтальном рычаге груз давит вниз силой 10 Н слева в 0,3 м от оси. Какую силу вниз приложить справа в 0,2 м для равновесия?|15 Н",
  "unit": "Н",
  "key": 15.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Противоположные моменты равны: 10 · 0,3 = F · 0,2. Получаем 15 Н."
 },
 {
  "exam": "AP Physics 1",
  "topic": "Колебания",
  "raw": "Массу груза идеального пружинного осциллятора увеличили в четыре раза. Во сколько раз вырастет период при той же жёсткости?|2 раз",
  "unit": "раз",
  "key": 2.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Период пропорционален квадратному корню из массы. Корень из четырёх равен двум."
 },
 {
  "exam": "AP Physics 1",
  "topic": "Кинематика",
  "raw": "Точка на ободе радиуса 0,25 м вращается с угловой скоростью 20 рад/с. Найди линейную скорость точки.|5 м/с",
  "unit": "м/с",
  "key": 5.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "За поворот на один радиан точка проходит один радиус по дуге. Поэтому v = ωr = 20 · 0,25 = 5 м/с."
 },
 {
  "exam": "IB Physics",
  "topic": "Измерения",
  "raw": "Сторона квадрата измерена с относительной неопределённостью 1,5 %. Оцени относительную неопределённость площади в первом приближении.|3 %",
  "unit": "%",
  "key": 3.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Площадь пропорциональна квадрату стороны. Малое относительное изменение площади примерно вдвое больше: 2 · 1,5 % = 3 %."
 },
 {
  "exam": "IB Physics",
  "topic": "Волновое движение",
  "raw": "В струне длиной 0,60 м с двумя закреплёнными концами наблюдают основную гармонику. Скорость волны 300 м/с. Найди частоту.|250 Гц",
  "unit": "Гц",
  "key": 250.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Между концами укладывается полволны: λ = 1,20 м. Частота 300/1,20 = 250 Гц."
 },
 {
  "exam": "IB Physics",
  "topic": "Электрический ток",
  "raw": "Источник с ЭДС 6 В при токе 2 А даёт на клеммах 4 В. Оцени внутреннее сопротивление источника.|1 Ом",
  "unit": "Ом",
  "key": 1.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Внутри источника падают 6 − 4 = 2 В. Делим это падение на ток: 2/2 = 1 Ом."
 },
 {
  "exam": "IB Physics",
  "topic": "Тепловые явления",
  "raw": "Идеальный газ в запаянном жёстком сосуде имел температуру 280 К. Абсолютное давление выросло на 25 %. Найди конечную температуру.|350 К",
  "unit": "К",
  "key": 350.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Количество и объём постоянны, поэтому p/T постоянно. Конечная температура 280 · 1,25 = 350 К."
 },
 {
  "exam": "IB Physics",
  "topic": "Атомная физика",
  "raw": "Активность одного радиоизотопа без фонового сигнала упала с 800 до 100 Бк за 36 часов. Каков период полураспада в часах?|12 ч",
  "unit": "ч",
  "key": 12.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "Три последовательных деления пополам дают 800 → 400 → 200 → 100. На один период приходится 36/3 = 12 ч."
 },
 {
  "exam": "IB Physics",
  "topic": "Энергия",
  "raw": "Температуру абсолютно чёрного тела увеличили с 300 до 600 К при неизменной площади поверхности. Во сколько раз выросла полная излучаемая мощность?|16 раз",
  "unit": "раз",
  "key": 16.0,
  "level": 8,
  "skill": "Расчёт",
  "solution": "По закону Стефана–Больцмана мощность пропорциональна четвёртой степени температуры: (600/300)⁴ = 16."
 }
]);
let examTrack="all", attemptId;
const examPool=()=>examTasks.filter(x=>examTrack==="all"||x.exam===examTrack);
const requested=()=>({10:15,20:25,30:35}[minutes]);
const length=()=>mode==='exams'?Math.min(requested(),examPool().length):scoped()?Math.min(requested(),termPool().length):requested();
const scopeLabel=()=>mode==='exams'?`Physics · ${examTrack}`:scoped()?`${grade} класс · ${quarter} четверть`:routes[mode][1];
const basic=Object.entries(bank).flatMap(([g,groups])=>groups.flatMap(([topic,...tasks])=>tasks.map((raw,i)=>({topic,raw,level:(+g-7)*2+i,grade:+g}))));
function extra(topic,level,...tasks){return tasks.map(raw=>({topic,level,raw}))}
const life=[...extra('Домашняя электрика',2,'Чайник мощностью 2 кВт работает 6 минут. Какую энергию учтёт счётчик?|0,2 кВт·ч|12 кВт·ч|2 кВт·ч|0,02 кВт·ч','Лампы в квартире работают независимо. Как они соединены?|Параллельно|Последовательно|Через одну нить|Без источника'),...extra('Транспорт',3,'При той же силе торможения скорость автомобиля удвоилась. Как изменится тормозной путь?|Увеличится в 4 раза|Удвоится|Не изменится|Уменьшится вдвое','Автобус прошёл 30 км за полчаса и стоял ещё полчаса. Средняя скорость за весь час?|30 км/ч|60 км/ч|15 км/ч|0 км/ч'),...extra('Тепло в быту',2,'Почему металлическая ручка кажется холоднее деревянной в той же комнате?|Быстрее отводит тепло руки|Всегда холоднее воздуха|Имеет меньшую массу|Не проводит тепло','Почему испарение пота охлаждает кожу?|На испарение нужна энергия|Вода отражает весь свет|Воздух перестаёт двигаться|Растёт давление'),...extra('Давление в быту',2,'Почему широкие лямки рюкзака удобнее при той же нагрузке?|Меньше давление на плечи|Меньше масса рюкзака|Выше сила тяжести|Меньше площадь контакта','В каком месте неподвижной воды избыточное давление больше?|На большей глубине|У поверхности|В середине независимо от глубины|Везде одинаково')];
const challenges=[...extra('Модели движения',9,'Пловец выронил мяч под мостом и плыл против течения ещё 5 мин. Затем развернулся и догнал мяч в 600 м от моста. Скорость относительно воды постоянна. Найди скорость течения.|1 м/с|2 м/с|0,5 м/с|4 м/с','Первую половину пути поезд шёл со скоростью v. Какова минимальная длительность всего пути длиной L, к которой можно приблизиться, ускоряясь на второй половине?|L/(2v)|L/v|2L/v|Ноль'),...extra('Равновесие',9,'Лодка с камнем плавает в бассейне. Камень бросили за борт, и он утонул. Уровень воды…|Понизится|Повысится|Не изменится|Зависит от формы лодки','Деревянный брусок плавает на воде наполовину погружённым. Сверху долили толстый слой масла плотностью 0,8 плотности воды. Как плавает брусок после установления равновесия?|На поверхности масла|На границе воды и масла|На дне|Целиком в воде'),...extra('Симметрия цепей',10,'Из двенадцати одинаковых резисторов R собрали рёбра куба. Ток входит в вершину и выходит из противоположной. Какая доля общего тока идёт по одному из шести средних рёбер?|1/6|1/3|1/12|1/2','Квадрат составлен из четырёх одинаковых резисторов R. Между противоположными вершинами приложено напряжение. Как изменится общий ток, если соединить две другие вершины проводом?|Не изменится|Удвоится|Обратится в ноль|Уменьшится вдвое'),...extra('Баланс энергии',10,'Шар прилипает к покоящейся тележке втрое большей массы. Трением пренебречь. Какая доля начальной кинетической энергии сохранится?|1/4|3/4|1/2|Вся','Два одинаковых конденсатора, один заряжен, другой нет, соединили параллельно через резистор. Какая доля начальной энергии выделится в виде тепла?|1/2|1/4|Вся|Ноль')];
for(const [items,steps] of [[basic,worked],[life,lifeSteps],[challenges,olympSteps]])items.forEach((x,i)=>x.solution=steps[i]);
// Fresh numerical values for each attempt. Keys are expressed in the displayed unit.
function numberTasks(){const n=2+Math.floor(Math.random()*7);return [
 ['Движение',1,`Велосипедист движется со скоростью ${n} м/с в течение 2 минут. Какой путь он проедет?`,120*n,'м',`Переводим 2 минуты в секунды: 2 · 60 = 120 с. При постоянной скорости s = vt = ${n} · 120 = ${120*n} м.`],
 ['Тепловые явления',3,`Какое количество теплоты нужно для нагревания ${n} кг воды на 5 °C? Удельная теплоёмкость воды 4200 Дж/(кг·°C).`,21*n,'кДж',`По формуле Q = cmΔT получаем 4200 · ${n} · 5 = ${21000*n} Дж. Делим на 1000 для перевода в кДж.`],
 ['Законы сохранения',5,`Тело массой ${n} кг движется со скоростью 4 м/с. Определи его кинетическую энергию.`,8*n,'Дж',`Кинетическая энергия E = mv²/2. Подставляем E = ${n} · 4²/2 = ${8*n} Дж.`],
 ['Домашняя электрика',2,`Обогреватель мощностью ${n*100} Вт включён на 30 минут. Сколько энергии он израсходует?`,n/20,'кВт·ч',`Мощность в киловаттах равна ${n/10}, время в часах — 0,5. Энергия E = Pt = ${n/10} · 0,5 = ${n/20} кВт·ч.`],
 ['Термодинамика',7,`Газу сообщили ${n*90} Дж теплоты. Газ совершил работу ${n*30} Дж. На сколько увеличилась внутренняя энергия?`,60*n,'Дж',`Согласно первому закону термодинамики ΔU = Q − A. Вычитаем работу газа: ${90*n} − ${30*n} = ${60*n} Дж.`],
 ['Переменный ток',8,`В первичной обмотке 600 витков, во вторичной 150. Первичное напряжение ${n*20} В. Найди вторичное напряжение идеального трансформатора.`,5*n,'В',`Напряжения относятся как числа витков: U₂ = U₁ · 150/600. Это четверть входного напряжения: ${20*n}/4 = ${5*n} В.`],
 ['Баланс энергии',10,`Тележка массы m со скоростью ${4*n} м/с сцепляется с неподвижной тележкой массы 3m. Сколько джоулей энергии движения останется, если m = 1 кг?`,2*n*n,'Дж',`Импульс сохраняется: общая скорость v = ${4*n}/4 = ${n} м/с. Общая масса 4 кг, поэтому E = 4 · ${n}²/2 = ${2*n*n} Дж.`]
 ].map(([topic,level,q,key,unit,solution])=>({topic,level,raw:q+'|'+key+' '+unit,key,unit,solution}));}
const skills=['Теория','Расчёт','Понимание'];
const skillCodes=['ТЧЧ','ТЧЧ','ТЧП','ТЧЧ','ТЧЧ','ТЧЧ','ТЧЧ','ТПЧ','ТЧЧ','ТЧЧ','ТЧЧ','ТЧЧ','ТПЧ','ТЧЧ','ТЧП','ТЧЧ','ТЧЧ','ТПЧ','ТПЧ','ТЧЧ'];
const decode=c=>({'Т':'Теория','Ч':'Расчёт','П':'Понимание'}[c]);
basic.forEach((x,i)=>x.skill=decode(skillCodes[Math.floor(i/3)][i%3]));
life.forEach((x,i)=>x.skill=decode('ЧППЧПППП'[i]));
challenges.forEach((x,i)=>x.skill=decode('ЧПППЧПЧЧ'[i]));
const drills=new Map();let reportTopics=[],activeDrill=null;
const illustration=x=>x.diagram?`<figure class="taskfigure">${x.diagram}<figcaption>Цель КТП · ${x.goal}</figcaption></figure>`:'';
const drillScore=d=>d?.attempts.length?`Практика: ${d.attempts.filter(a=>a.ok).length}/${d.attempts.length}`:'';
function openCell(t,k){
 const topic=reportTopics[t],skill=skills[k],rows=log.filter(x=>x.topic===topic&&x.skill===skill),id=`${t}:${k}`;
 if(!drills.has(id))drills.set(id,{attempts:[]});const d=drills.get(id);activeDrill={t,k,d,topic,skill};
 const box=$('#cellpractice');box.hidden=false;box.innerHTML=`<small>ЛАБОРАТОРИЯ / ПРАКТИКА</small><h3>${topic} · ${skill}</h3>${noteLink(topic)}<p>Первая попытка: ${rows.length?`${rows.filter(x=>x.ok).length} из ${rows.length}`:'нет данных'}. ${rows.length===1&&!rows[0].ok?'Одна ошибка ещё не означает пробел. Проверь себя на другом примере.':''}</p>${rows.filter(x=>!x.ok).map(x=>`<details><summary>Разобрать: ${x.q}</summary>${illustration(x)}<p>Твой ответ: ${x.choice}. Верный ответ: ${x.key}.</p><p>${x.solution}</p></details>`).join('')}<p>${drillScore(d)}</p>${d.attempts.map(a=>`<details><summary>${a.ok?'✓':'×'} ${a.q}</summary><p>Твой ответ: ${a.answer}. Верный ответ: ${a.key}.</p><p>${a.solution}</p></details>`).join('')}<div id="exercise"><button onclick="beginDrill()">${rows.length===1&&!rows[0].ok?'Уточняющая задача':rows.length?'Попробовать ещё раз':'Попробовать задачу'} →</button></div>`;box.focus();
}
function beginDrill(){
 const {topic,skill}=activeDrill,used=new Set([...log.map(x=>x.raw),...[...drills.values()].flatMap(d=>d.attempts.map(a=>a.raw))]);
 const pool=[...practiceExtras,...visualTasks,...reasoning,...basic,...multipleChoice,...termExtras,...life,...challenges,...numberTasks().map(x=>({...x,skill:'Расчёт'}))].filter(x=>x.topic===topic&&!used.has(x.raw));
 let x=pool.find(x=>x.skill===skill)||pool[0];const el=$('#exercise');
 if(!x){el.innerHTML='<p>Новых задач по этой теме пока нет. Можно вернуться к разбору выше или выбрать другую ячейку.</p>';return}
 activeDrill.x=x;let [q,...opts]=x.raw.split('|');el.innerHTML=`<small>${x.skill===skill?'НОВОЕ ЗАДАНИЕ':'СМЕЖНЫЙ НАВЫК'} / ${x.skill}</small><h4>${q}</h4>${illustration(x)}<form onsubmit="checkDrill(this);return false">${x.unit?`<label>Ответ в ${x.unit}: <input name="value" inputmode="decimal" required></label>`:`<p>${x.keys?'Отметь все верные варианты':'Выбери один вариант'}</p>${shuffle(opts.map((v,i)=>[v,i])).map(([v,i])=>`<label class="multi-option"><input name="option" type="${x.keys?'checkbox':'radio'}" value="${i}" ${x.keys?'':'required'}><span>${v}</span></label>`).join('')}`}<button class="primary">Проверить</button><p role="status"></p></form>`;
}
function checkDrill(form){
 const {t,k,d,x}=activeDrill;if(!x)return;const [q,...opts]=x.raw.split('|');let key=opts[0],answer,ok;
 if(x.unit){const v=form.elements.value.value.trim().replace(',','.');if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(v)){form.querySelector('[role=status]').textContent='Введи число.';return}ok=Number(v)===x.key;answer=v+' '+x.unit}
 else{const a=[...form.querySelectorAll('input:checked')].map(el=>opts[Number(el.value)]);if(!a.length){form.querySelector('[role=status]').textContent='Выбери хотя бы один вариант.';return}const keys=x.keys||[key];ok=a.length===keys.length&&keys.every(v=>a.includes(v));answer=a.join('; ');key=keys.join('; ')}
 d.attempts.push({raw:x.raw,q,answer,key,ok,solution:x.solution});activeDrill.x=null;$(`#drill-${t}-${k}`).textContent=drillScore(d);$('#exercise').innerHTML=`<p><b>${ok?'Верно!':'Разберём решение'}</b> Твой ответ: ${answer}. Верный ответ: ${key}.</p><p>${x.solution}</p><small>${drillScore(d)} · исходный результат не изменён</small><button onclick="beginDrill()">Ещё задача →</button>`;
}
function analyser(topics){
 const group=(rows)=>{let n=rows.length,r=rows.filter(x=>x.ok).length;return {n,r,p:n?Math.round(100*r/n):null}};
 const all=group(log),seen=topics.filter(t=>t.n).length;
 const color=g=>!g.n?'empty':g.n<3?'tentative':g.r===g.n?'strong':!g.r?'weak':'mixed';
 reportTopics=topics.map(t=>t.topic);
 const cell=(rows,t,k)=>{const g=group(rows),id=`${t}:${k}`,d=drills.get(id);return `<td class="tile ${color(g)}"><button class="cellbtn" aria-label="${reportTopics[t]}: ${skills[k]}, открыть практику" onclick="openCell(${t},${k})"><b>${g.n?g.p+'%':'—'}</b><span>${g.n?`${g.r} из ${g.n}`:'нет данных'}</span>${g.n>0&&g.n<3?'<small>Пока мало данных</small>':''}<span id="drill-${t}-${k}">${drillScore(d)}</span></button></td>`};
 return `<section class="atlas"><div class="atlas-banner"><div><small>АНАЛИТИКА / ${scopeLabel().toUpperCase()}</small><h3>Профиль знаний</h3><p>Проверено тем: <b>${seen} из ${topics.length}</b> · Ответов: <b>${all.n} из ${length()}</b></p></div><div class="dial" style="--pct:${all.p||0}%"><b>${all.p===null?'—':all.p+'%'}</b></div></div><div class="skillstrip">${skills.map(skill=>{let g=group(log.filter(x=>x.skill===skill));return `<div><strong>${skill}</strong><span>${g.r} / ${g.n} верно</span><meter min="0" max="100" value="${g.p||0}"></meter></div>`}).join('')}</div><h3>Карта по темам и навыкам</h3>${all.n?`<p>Вес одного ответа в этой попытке: <b>${(100/all.n).toFixed(1)} п.п.</b> При сравнении смотри на число ответов, а не только на проценты.</p>`:''}<p>Нажми на ячейку для разбора и практики. Каждая ячейка показывает долю верных ответов и размер выборки. Один ответ — наблюдение, а не окончательная оценка навыка.</p><div class="legend"><span class="strong">Все верно</span><span class="mixed">Часть верно</span><span class="weak">Есть трудности</span><span class="tentative">Пока мало данных</span><span class="empty">Не проверено</span></div><div class="matrixwrap" tabindex="0" aria-label="Карта результатов по темам"><table class="matrix"><thead><tr><th>Тема</th>${skills.map(s=>`<th scope="col">${s}</th>`).join('')}<th>Итого</th></tr></thead><tbody>${topics.map((t,ti)=>{const rows=log.filter(x=>x.topic===t.topic);return `<tr><th scope="row">${t.topic}</th>${skills.map((k,ki)=>cell(rows.filter(x=>x.skill===k),ti,ki)).join('')}<td>${t.n?t.r+' / '+t.n:'—'}</td></tr>`}).join('')}</tbody></table></div><section id="cellpractice" hidden tabindex="-1"></section>${log.length?`<h4>Ход диагностики</h4><div class="trail">${log.map((x,i)=>`<a href="#task-${i}" class="${x.ok?'strong':'weak'}" aria-label="Задание ${i+1}: ${x.ok?'верно':'ошибка'}, открыть решение">${i+1}${x.ok?' ✓':' ×'}</a>`).join('')}</div>`:''}</section>`;
}
function enterNumber(input){const text=input.value.trim();choice=/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(text)&&Number.isFinite(Number(text.replace(',','.')))?text:null;$('#next').disabled=choice===null}
// An explicit whitelist of curriculum sections: adaptive difficulty never widens the scope.
// Explicit textbook-to-KTP mapping; never fill a short quarter with unrelated tasks.
const termParagraphs={"7": {"Научный метод": [1, 2], "Измерения": [3, 4, 5, 11, 12], "Движение": [6, 7, 8, 9, 10], "Плотность": [13], "Взаимодействие тел": [14, 15, 16, 17, 18, 19, 20], "Давление": [21, 22, 23, 24, 25, 26, 27, 28, 29], "Работа и мощность": [30], "Энергия": [31, 32, 36], "Простые механизмы": [33, 34, 35], "Космос и Земля": [37, 38, 39]}, "8": {"Тепловые явления": [1, 2, 3, 4, 5, 6, 7, 8, 9], "Агрегатные состояния": [10, 11, 12], "Термодинамика": [13, 14, 15, 16, 17], "Электростатика": [18, 19], "Электрическое поле": [20, 21], "Электрический ток": [22, 23, 24, 25, 26, 27, 28, 29, 30, 31], "Электромагнитные явления": [32, 33, 34, 35, 36], "Оптика": [37, 38, 39, 40, 41, 42, 43]}, "9": {"Кинематика": [1, 2, 3, 4, 5, 6, 7], "Основы астрономии": [8, 9, 10, 11, 12], "Динамика": [13, 14, 15, 16], "Тяготение": [17, 18, 19], "Законы сохранения": [20, 21, 22, 23], "Колебания и волны": [24, 25, 26, 27, 28, 29, 30, 31], "Квантовая физика": [32, 33, 34], "Атомное ядро": [35, 36, 37, 38, 39, 40], "Современная физика": [41, 42, 43]}, "10": {"Кинематика": [2, 3, 4, 5, 6], "Динамика": [7, 8, 9, 10], "Статика": [11, 12], "Законы сохранения": [13], "Механика жидкостей": [14, 15, 16], "Молекулярная физика": [17, 18, 19, 20, 21], "Термодинамика": [22, 23, 24], "Жидкие и твёрдые тела": [25, 26, 27], "Электрическое поле": [28, 29, 30, 31, 32, 33, 34, 35], "Постоянный ток": [36, 37, 38, 39, 40], "Ток в разных средах": [41, 42, 43, 44], "Магнитное поле": [45, 46, 47, 48], "Электромагнитная индукция": [49, 50, 51, 52]}, "11": {"Колебания": [1], "Электромагнитные колебания": [2, 3], "Переменный ток": [4, 5, 6, 7, 8, 9, 10, 11], "Волновое движение": [12, 13], "Радиосвязь": [14, 15, 16, 17], "Волновая оптика": [18, 19, 20, 21], "Оптика": [22, 23, 24, 25, 26], "Теория относительности": [27, 28], "Квантовая физика": [29, 30, 31, 32, 33, 34, 35, 36, 37, 38], "Атомное ядро": [39, 40, 41, 42, 43, 44], "Наноматериалы": [45], "Звёзды": [46, 47, 48], "Галактики": [49], "Космология": [50, 51]}};
const quarterDeckCache=new Map();
function textbookQuarterTasks(g,topics){
 const ru=v=>Array.isArray(v)?v[0]:v, all=[];
 for(const topic of topics){for(const n of termParagraphs[g][topic]||[]){const id=`${g}.${n}`,a=paragraphActivities[id],[,title,key]=textbookIndex[g][n-1];
  const solution=ru(a.why),q=ru(a.prompt),opts=a.choices.map(ru),level=(g-7)*2+1;
  all.push({topic,grade:g,level,raw:[q,...opts].join('|'),solution,skill:/[=×Δλμ²]/.test(q)?'Расчёт':'Понимание'});
  const definition=lessonGlossary[key];const other=[...new Set(textbookIndex[g].map(x=>lessonGlossary[x[2]][0]))].filter(x=>x!==definition[0]);
  all.push({topic,grade:g,level,raw:[`Выбери ключевое понятие: ${title[0]}`,definition[0],other[n%other.length],other[(n+3)%other.length]].join('|'),solution:definition[0],skill:'Теория'});
 }}return all;
}
function termPool(){
 const topics=curriculum[grade][quarter-1];
 const cacheKey=`${grade}.${quarter}`;if(quarterDeckCache.has(cacheKey))return quarterDeckCache.get(cacheKey);
 const candidates=[...basic,...reasoning,...multipleChoice,...visualTasks,...termExtras,...textbookQuarterTasks(grade,topics)];
 const items=candidates.filter(x=>topics.includes(x.topic)).map(x=>{
   const y={...x,grade,level:x.level??((grade-7)*2+1)};
   // A calculation with an unambiguous decimal result can be answered without choices.
   const m=x.raw.split('|')[1].match(/^([+−-]?\d+(?:[.,]\d+)?) (.+)$/);
   if(!x.keys && x.skill==='Расчёт' && m){y.key=Number(m[1].replace('−','-').replace(',','.'));y.unit=m[2];}
   return y;
 });
 const pool=[...new Map(items.map(x=>[x.raw.split('|')[0],x])).values()];quarterDeckCache.set(cacheKey,pool);return pool;
}
function termPicker(){return `<section class="term-picker"><h3><span class="idx">/03</span>Период проверки</h3><div class="buttons">${['Весь курс','I четверть','II четверть','III четверть','IV четверть'].map((t,i)=>btn(t,quarter===i,`quarter=${i};setup()`)).join('')}</div><p>${quarter?`<b>${grade} класс · ${quarter} четверть.</b> ${curriculum[grade][quarter-1].join(' · ')}. В подборке: ${termPool().length}.`:'Весь курс — адаптивная диагностика. Выбери четверть, чтобы проверить только её темы по КТП.'}</p></section>`}
function encouragement(wins,weak){if(!log.length)return 'Можно начать с одного вопроса. Даже короткая попытка поможет выбрать тему для практики.';if(!weak)return `В этой попытке все ответы верны! Попробуй объяснить решение по теме «${log[0].topic}» своими словами — это следующий шаг к уверенному пониманию.`;return `${wins.length?`У тебя уже есть верный ответ по теме «${wins[0].topic}».`:'Ошибки в диагностике — не оценка, а подсказка для следующей попытки.'} Выбери одну задачу по теме «${weak.topic}», прочитай разбор и реши её ещё раз без подсказки. Начни с этого небольшого шага.`}
function heading(a,b){label.innerHTML='<i></i> МОДУЛЬ 01 / '+a;title.textContent=b}
function btn(text,active,fn){return `<button aria-pressed="${active}" class="${active?'sel':''}" onclick="${fn}">${text}</button>`}
function setup(){heading('НАСТРОЙКА','ДИАГНОСТИКА');panel.innerHTML=`<div class="row"><div class="field">${(mode==='school'||mode==='adult')?`<h3><span class="idx">/01</span>${ageMode?'Укажи возраст':'Выбери класс'}</h3>${ageMode&&mode==='school'?`<p><label for="age">ВОЗРАСТ, ЛЕТ</label> <input id="age" type="number" min="11" max="18" value="${age}" oninput="age=this.value"></p>`:`<div class="buttons grades">${[7,8,9,10,11].map(g=>btn(g,mode==='school'&&grade===g,`mode='school';grade=${g};setup()`)).join('')}${btn('Взрослый',mode==='adult',`mode='adult';ageMode=false;setup()`)}</div>`}<button class="link" onclick="mode='school';ageMode=!ageMode;setup()">${ageMode?'Выбрать класс':'Не знаю класс — указать возраст'}</button>`:`<h3>${routes[mode][1]}</h3><p>${{adult:'Начнём с привычных ситуаций: счёт за свет, транспорт и тепло в доме.',olymp:'Начнём с нестандартной задачи. Если сложно, вернёмся к опорным законам.',exams:'Авторские тренировочные задания по мотивам экзаменов, не официальные варианты или прогноз оценки.'}[mode]}</p>${mode==='exams'?`<div class="buttons">${['all','IGCSE','CSAT','AP Physics 1','IB Physics'].map(x=>btn(x==='all'?'Смешанный набор':x==='CSAT'?'CSAT · 수능':x,examTrack===x,`examTrack='${x}';setup()`)).join('')}</div>`:''}`}</div><div class="field"><h3><span class="idx">/02</span>Длительность</h3><div class="buttons times">${[10,20,30].map(m=>btn(m+' мин',minutes===m,`minutes=${m};setup()`)).join('')}</div></div></div><details class="advanced" ${expanded?'open':''} ontoggle="expanded=this.open"><summary><b>Дополнительные настройки</b><span>${routes[mode][1]}</span></summary>${mode==='school'&&!ageMode?termPicker():''}<div class="routes">${Object.entries(routes).map(([k,[n,t,d]])=>btn(`<small>МАРШРУТ / ${n}</small><b>${t}</b><span>${d}</span>`,mode===k,`mode='${k}';setup()`)).join('')}</div></details><div class="action"><span>◷ &nbsp; Вопросов: ${length()} · Без таймера</span><button class="primary" onclick="start()">Начать ${mode==='exams'?'пробник':'диагностику'} →</button></div>`}
const shuffle=a=>{let b=[...a];for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
function start(){attemptId=crypto.randomUUID();if(mode==='school'&&ageMode){if(!$('#age').value||!$('#age').checkValidity()){$('#age').required=true;$('#age').reportValidity();return}grade=Math.max(7,Math.min(11,Math.round(age)-6))}drills.clear();activeDrill=null;log=[];target=mode==='olymp'?9:mode==='adult'?2:(grade-7)*2+1;deck=shuffle(mode==='adult'?[...life,...basic.filter(x=>x.grade<=9)]:mode==='olymp'?[...challenges,...olympBookTasks,...basic.filter(x=>x.grade>=9)]:mode==='exams'?basic.filter(x=>x.grade>=9):basic);deck=shuffle([...deck,...visualTasks.filter(x=>mode==='school'&&x.grade===grade),...reasoning.filter(x=>mode==='adult'?x.grade<=9:mode==='school'||x.grade>=9),...multipleChoice.filter(x=>mode==='adult'?x.grade<=9:mode==='school'||x.grade>=9),...numberTasks().map(x=>({...x,skill:'Расчёт'}))]);if(mode==='exams')deck=shuffle(examPool());initialTopics=[...new Set((mode==='school'?basic.filter(x=>x.grade===grade):mode==='adult'?life:mode==='olymp'?challenges:deck.slice(0,length())).map(x=>x.topic))];if(scoped()){deck=shuffle(termPool());initialTopics=[...curriculum[grade][quarter-1]]}question();focusPanel()}
let shownAt=0;
function question(){shownAt=performance.now();const score=x=>Math.abs(x.level-target)+Math.min(4,log.filter(r=>r.topic===x.topic).length)*1.1+(log.at(-1)?.topic===x.topic?2:0)-(initialTopics.includes(x.topic)?0.6:0);if(mode!=='exams')deck.sort((a,b)=>score(a)-score(b));const numeric=log.length%4===1;const desired=['Понимание','Расчёт','Теория','Понимание','Расчёт','Расчёт','Понимание','Теория'][log.length%8];const multi=log.length%8===3;let idx=deck.findIndex(x=>Boolean(x.keys)===multi&&Boolean(x.unit)===numeric&&x.skill===desired);if(idx<0)idx=deck.findIndex(x=>Boolean(x.unit)===numeric);if(mode==='school'&&log.length===0){const vi=deck.findIndex(x=>x.diagram&&x.grade===grade);if(vi>=0)idx=vi}if(mode==='school'&&log.length%3===1){const unseen=deck.findIndex(x=>initialTopics.includes(x.topic)&&!log.some(r=>r.topic===x.topic));if(unseen>=0)idx=unseen}if(mode==='school'&&log.length%3===2){const probe=log.find(r=>!r.ok&&log.filter(x=>x.topic===r.topic&&x.skill===r.skill).length===1&&deck.some(x=>x.topic===r.topic&&x.skill===r.skill&&x.raw!==r.raw));if(probe)idx=deck.findIndex(x=>x.topic===probe.topic&&x.skill===probe.skill&&x.raw!==probe.raw)}item=deck.splice(Math.max(idx,0),1)[0];choice=null;const [q,...opts]=item.raw.split('|');heading(mode==='exams'?'ПРОБНИК':'ПРОВЕРКА',item.topic.toUpperCase());panel.innerHTML=`<small>${item.exam||scopeLabel().toUpperCase()} · ${item.skill.toUpperCase()} · ВОПРОС ${log.length+1} ИЗ ${length()}</small><div class="progress"><b style="width:${100*log.length/length()}%"></b></div><h3>${q}</h3>${illustration(item)}${item.unit?`<div class="number-answer"><label for="numberInput">Ответ в ${item.unit}</label><input id="numberInput" type="text" inputmode="decimal" autocomplete="off" placeholder="Введи число" oninput="enterNumber(this)"></div>`:`${item.keys?'<p class="multi-hint">Отметь все верные варианты. Ответ засчитывается только при полном совпадении.</p>':''}<div class="answers">${shuffle(opts).map(x=>item.keys?`<label class="multi-option"><input type="checkbox" value="${opts.indexOf(x)}" onchange="pickMany()"><span>${x}</span></label>`:`<button value="${opts.indexOf(x)}" onclick="pick(this)">${x}</button>`).join('')}</div>`}<label class="certainty">Уверенность перед проверкой <select id="certainty"><option value="">Не отмечено</option><option value="guess">Предполагаю</option><option value="unsure">Сомневаюсь</option><option value="explain">Могу объяснить</option></select></label><div class="action"><button onclick="result()">Завершить досрочно</button><button class="primary" id="next" disabled onclick="advance()">${log.length+1===length()?'Показать результат':'Следующий вопрос'} →</button></div>`}
function pick(b){panel.querySelectorAll('.answers button').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');choice=item.raw.split('|')[Number(b.value)+1];$('#next').disabled=false}
function pickMany(){const values=[...panel.querySelectorAll('.multi-option input:checked')].map(el=>item.raw.split('|')[Number(el.value)+1]);choice=values.length?values:null;$('#next').disabled=choice===null}
function advance(){if(choice===null)return;let [q,key]=item.raw.split('|'),ok=item.unit?Number(choice.replace(',','.'))===item.key:choice===key;if(item.keys){ok=Array.isArray(choice)&&choice.length===item.keys.length&&item.keys.every(k=>choice.includes(k));key=item.keys.join('; ');choice=choice.join('; ')}if(item.unit)choice+=' '+item.unit;log.push({...item,q,key,choice,ok,confidence:$('#certainty').value||null,elapsedMs:Math.round(performance.now()-shownAt)});target=Math.max(0,Math.min(10,target+(ok?1:-2)));log.length===length()?result():question()}
function knowledgeLevel(answers){
 const wins=answers.filter(a=>a.ok),n=answers.length;
 if(n<4)return ['Пока недостаточно данных','Для первого ориентира нужны хотя бы четыре ответа.'];
 const accuracy=wins.length/n;
 const mean=wins.length?wins.reduce((sum,a)=>sum+a.level,0)/wins.length:0;
 if(accuracy<0.4)return ['Начальный','Стоит разобрать основные понятия тех тем, в которых были ошибки.'];
 if(accuracy>=0.8&&mean>=7)return ['Продвинутый','Большинство ответов верны, в том числе на задания высокой сложности.'];
 if(accuracy>=0.65&&mean>=3)return ['Уверенный','Большинство заданий решено верно. Закрепи результат на новых примерах.'];
 return ['Базовый','Есть верно решённые задания. Следующий шаг — применить те же законы в незнакомой ситуации.'];
}
function levelCard(){
 const [level,detail]=knowledgeLevel(log),scope=scoped()?`${scopeLabel()} · только темы четверти`:mode==='school'?`Старт: ${grade} класс · по проверенным темам`:`${scopeLabel()} · по проверенным темам`;
 return `<section class="level-card"><small>ИТОГ ДИАГНОСТИКИ</small><h3>Примерный уровень знаний по физике</h3><strong>${level}</strong><p>${detail}</p><p>${scope}. Верных ответов: ${log.filter(a=>a.ok).length} из ${log.length}.</p><details><summary>Как понимать результат?</summary><p>Ориентир учитывает долю верных ответов и сложность решённых заданий. ${log.length<15?'Выборка короткая: результат особенно чувствителен к отдельным ответам. ':''}Это не школьная отметка и не оценка всего курса. Дополнительная практика не меняет исходный уровень.</p></details></section>`;
}
function result(){recordMap(log,scoped()?scopeLabel():mode==='school'?`${grade} класс · весь курс`:scopeLabel());heading('РЕЗУЛЬТАТ','ТЕПЛОВАЯ КАРТА ТЕМ');let topics=[...new Set([...initialTopics,...log.map(x=>x.topic)])].map(topic=>{let a=log.filter(x=>x.topic===topic);return {topic,n:a.length,r:a.filter(x=>x.ok).length}});globalThis.profileAttempt?.(attemptId,scoped()?scopeLabel():mode==='school'?`${grade} класс · весь курс`:scopeLabel(),planner.cells);let weak=topics.filter(x=>x.r<x.n).sort((a,b)=>Number(a.n===1)-Number(b.n===1)||a.r/a.n-b.r/b.n||b.n-a.n)[0],first=log.find(x=>!x.ok&&x.topic===weak?.topic),wins=log.filter(x=>x.ok);panel.innerHTML=`${levelCard()}<p><a class="plan-link" href="#mentor-plan">Советы по моей карте →</a></p><div class="encouragement"><small>СЛЕДУЮЩИЙ ШАГ</small><p>${encouragement(wins,weak)}</p></div>${analyser(topics)}${researchSummary()}<p><a class="plan-link" href="#accounts">Сохранить карту между занятиями →</a></p><p><a class="plan-link" href="#study-plan">Открыть план обучения по этой карте ↓</a> · <a class="plan-link" href="#ai-tutor">ИИ-наставник по результатам диагностики</a></p><aside><small>ПЕРСОНАЛЬНЫЙ ПЛАН</small><h3>С чего начать</h3>${first?`<ol><li>${weak.n===1?'Уточни результат по теме':'Начни с темы'} «${weak.topic}»: ${weak.r} из ${weak.n} верно.</li><li>Разбери задачу: «${first.q}» Твой ответ: ${first.choice}. Верный: <b>${first.key}</b>. Запиши закон, который объясняет этот ответ.</li><li>Реши две похожие задачи без подсказок и повтори проверку.</li></ol>`:!log.length?'<p>Начни с короткой диагностики: без ответов персональный план построить нельзя.</p>':'<p>Ошибок в проверенных задачах нет. Попробуй более длинную проверку или выбери олимпиадный маршрут. Для самостоятельной практики используй архив задач ниже.</p>'}</aside>${log.length?`<section class="solutions"><h3>Задачи и решения</h3>${log.map((x,i)=>`<article id="task-${i}"><small>${i+1} / ${x.skill.toUpperCase()} / ${x.ok?'ВЕРНО':'ЕСТЬ ОШИБКА'}</small><h4>${x.q}</h4>${illustration(x)}<p>Твой ответ: ${x.choice} · Правильный ответ: <b>${x.key}</b></p><p>${x.solution}</p></article>`).join('')}</section>`:''}<button class="primary" onclick="setup();focusPanel()">Выбрать новую проверку →</button>`;window.dispatchEvent(new CustomEvent("physlab:map-ready",{detail:attemptId}));focusPanel()}setup();

function researchSummary(){
 if(!log.length)return '';
 const labels={guess:'Предполагаю',unsure:'Сомневаюсь',explain:'Могу объяснить',none:'Не отмечено'};
 return `<aside><h3>Как совпали уверенность и результат?</h3><p>Верных ответов / всего</p><ul>${Object.entries(labels).map(([key,label])=>{const rows=log.filter(x=>(x.confidence||'none')===key);return rows.length?`<li>${label}: ${rows.filter(x=>x.ok).length} / ${rows.length}</li>`:''}).join('')}</ul><p>Файл создаётся на устройстве, без имени и введённых ответов. Время между показом и ответом включает паузы. Это описание одной адаптивной попытки, не оценка эффективности обучения.</p><button onclick="exportDiagnostic()">Скачать протокол (JSON)</button></aside>`;
}
function researchProtocol(){return {schema:'physlab.diagnostic.v1',mode,grade:mode==='school'?grade:null,quarter:scoped()?quarter:null,planned:length(),answered:log.length,items:log.map((x,i)=>({order:i+1,prompt:x.q,topic:x.topic,skill:x.skill,level:x.level,format:x.unit?'numeric':x.keys?'multiple':'single',correct:x.ok,confidence:x.confidence,elapsedMs:x.elapsedMs}))}}
function exportDiagnostic(){const url=URL.createObjectURL(new Blob([JSON.stringify(researchProtocol(),null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='physlab-diagnostic.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
