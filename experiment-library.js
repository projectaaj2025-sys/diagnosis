// Lesson assignments for the supplied Russian-language interdisciplinary instruments.
const experimentLibrary={
 "vectors": {
  "lesson": "9.2",
  "title": [
   "Векторы и сложение сил",
   "Adding force vectors",
   "Күш векторларын қосу"
  ],
  "guide": [
   "Разверни вторую силу на 180° к первой. Почему результат равен разности модулей, а не их сумме? Сравни стрелки до и после поворота.",
   "Turn the second force opposite the first. Why is the result the difference of the magnitudes? Compare the arrows before and after.",
   "Екінші күшті біріншіге қарсы бұр. Неге нәтиже модульдердің айырмасына тең? Бұруға дейінгі және кейінгі бағыттарды салыстыр."
  ]
 },
 "refraction": {
  "lesson": "8.40",
  "title": [
   "Углы, синусы и преломление света",
   "Refraction at a boundary",
   "Шекарадағы жарықтың сынуы"
  ],
  "guide": [
   "Пусть свет входит из воздуха в воду. Увеличь угол падения, затем поменяй среды местами. Следи за углом к нормали, а не к поверхности.",
   "Send light from air into water. Increase incidence, then swap the media. Measure angles from the normal, not the surface.",
   "Жарықты ауадан суға бағытта. Түсу бұрышын өсір де орталарды ауыстыр. Бұрышты беттен емес, нормальдан сана."
  ]
 },
 "kinematics": {
  "lesson": "9.4",
  "title": [
   "Графики движения: физика + алгебра",
   "Motion graphs",
   "Қозғалыс графиктері"
  ],
  "guide": [
   "Задай положительную начальную скорость и отрицательное ускорение. Найди остановку на графике скорости и поворот на графике координаты: это один момент.",
   "Set a positive initial velocity and negative acceleration. Locate zero velocity and the turning point on the position graph: they occur together.",
   "Бастапқы жылдамдық оң, үдеу теріс болсын. Жылдамдық нөл болатын уақытты координата графигіндегі бұрылумен салыстыр."
  ]
 },
 "pendulum": {
  "lesson": "9.26",
  "title": [
   "Модель маятника: шаг, метод, ошибка",
   "Numerical pendulum",
   "Маятниктің сандық моделі"
  ],
  "guide": [
   "Маятник тот же, а результат расчёта слегка меняется. Уменьши шаг интегрирования, не меняя длину, и сравни ошибку двух методов.",
   "Keep the pendulum length fixed. Reduce the integration step and compare errors: a numerical model need not conserve energy exactly.",
   "Ұзындықты өзгертпей, есептеу қадамын кішірейт. Екі әдістің қатесін салыстыр: сандық модель энергияны дәл сақтамауы мүмкін."
  ]
 },
 "electrolysis": {
  "lesson": "8.31",
  "title": [
   "Электролиз раствора CuSO₄",
   "Copper electrolysis",
   "Мыстың электролизі"
  ],
  "guide": [
   "Сравни два опыта одинаковой длительности при разных токах. Масса осадка зависит от прошедшего заряда: важен не только ток, но и время.",
   "Compare equal durations at two currents. Deposited mass follows transferred charge, so both current and time matter.",
   "Екі түрлі токта бірдей уақытты салыстыр. Тұнба массасы өткен зарядқа тәуелді, сондықтан ток та, уақыт та маңызды."
  ]
 },
 "diffusion": {
  "lesson": "8.1",
  "title": [
   "Диффузия: молекулы в движении",
   "Particles and diffusion",
   "Бөлшектер мен диффузия"
  ],
  "guide": [
   "Повысь температуру. Отдельная частица не знает, куда двигаться, но наблюдай за всей смесью: как исчезает граница между цветами?",
   "Raise temperature. No particle knows where to go; watch the whole mixture instead. What happens to the boundary between colours?",
   "Температураны арттыр. Бөлшек бағытты таңдамайды. Қоспаны тұтас бақыла: түстердің шекарасы қалай өзгереді?"
  ]
 },
 "phases": {
  "lesson": "8.10",
  "title": [
   "Плавление и кипение: количество → качество",
   "Melting and boiling",
   "Балқу және қайнау"
  ],
  "guide": [
   "Добавляй теплоту одинаковыми порциями. Найди участок, где температура не растёт: энергия расходуется на переход между фазами.",
   "Add equal amounts of heat. Find an interval where temperature stays fixed: energy is changing the phase.",
   "Бірдей мөлшерде жылу қос. Температура өспейтін бөлікті тап: энергия фазалық ауысуға жұмсалады."
  ]
 },
 "eye": {
  "lesson": "8.42",
  "title": [
   "Глаз, линза и очки",
   "Eye, lens and glasses",
   "Көз, линза және көзілдірік"
  ],
  "guide": [
   "Сдвинь предмет ближе и проверь, сходятся ли лучи на сетчатке. Подбери очки, наблюдая место фокусировки, а не только число диоптрий.",
   "Move the object closer. Do the rays still meet on the retina? Choose a lens by watching the focus, not just the dioptre reading.",
   "Денені жақындат. Сәулелер тор қабықта түйісе ме? Көзілдірікті таңдағанда диоптриямен қатар фокусты бақыла."
  ]
 },
 "heart": {
  "lesson": "7.30",
  "title": [
   "Сердце как насос",
   "The heart as a pump",
   "Жүрек сорғы ретінде"
  ],
  "guide": [
   "Сердце выполняет работу, перемещая жидкость против перепада давления. Оставь ударный объём прежним и сравни минутный поток при двух частотах.",
   "The heart does work moving fluid against a pressure difference. Keep stroke volume fixed and compare minute flow at two rates.",
   "Жүрек қысым айырмасына қарсы сұйықты қозғап, жұмыс атқарады. Соққы көлемін сақтап, екі жиіліктегі минуттық ағынды салыстыр."
  ]
 },
 "hearing": {
  "lesson": "9.30",
  "title": [
   "Звук, улитка и диапазон слуха",
   "Frequency and hearing",
   "Жиілік және есту"
  ],
  "guide": [
   "Изменяй частоту при одной громкости. Следи за местом отклика в модели улитки: высота звука и громкость — разные признаки.",
   "Change frequency at fixed loudness and watch where the cochlea responds. Pitch and loudness are different attributes.",
   "Дыбыс қаттылығын сақтап, жиілікті өзгерт. Ұлудағы жауап орнын бақыла: дыбыс биіктігі мен қаттылығы бөлек қасиеттер."
  ]
 },
 "atmos": {
  "lesson": "8.12",
  "title": [
   "Давление воздуха и кипение воды в горах",
   "Boiling in the mountains",
   "Тауда судың қайнауы"
  ],
  "guide": [
   "Поднимись по шкале высоты. Вода закипает раньше по температуре, потому что для роста пузырьков теперь достаточно меньшего давления пара.",
   "Increase altitude. Water boils at a lower temperature because less vapour pressure is needed for bubbles to grow.",
   "Биіктікті арттыр. Көпіршіктердің өсуіне аз бу қысымы жеткілікті болғандықтан су төмен температурада қайнайды."
  ]
 },
 "earthsun": {
  "lesson": "7.38",
  "title": [
   "Наклон оси, сезоны и высота Солнца",
   "Earth’s tilt and seasons",
   "Жердің еңкеюі және маусымдар"
  ],
  "guide": [
   "Сравни июнь и декабрь на одной широте, затем убери наклон оси. Что станет с разницей в продолжительности дня?",
   "Compare June and December at the same latitude, then remove axial tilt. What happens to the difference in daylight duration?",
   "Бір ендікте маусым мен желтоқсанды салыстыр. Ось еңкеюін нөлге түсірсең, күн ұзақтығының айырмасы қандай болады?"
  ]
 },
 "gravity": {
  "lesson": "7.16",
  "title": [
   "Масса, вес и сила тяжести",
   "Mass and gravity",
   "Масса және ауырлық күші"
  ],
  "guide": [
   "Перенеси один груз с Земли на Луну. Масса осталась прежней: объясни, почему меняются сила тяжести и показание опоры для покоящегося груза.",
   "Move the same load from Earth to the Moon. Explain why the gravitational force and the support reading at rest change while mass stays fixed.",
   "Бір жүкті Жерден Айға көшір. Массасы өзгермесе де ауырлық күші мен тыныштықтағы тірек көрсеткіші неге өзгереді?"
  ]
 },
 "drag": {
  "lesson": "10.16",
  "title": [
   "Сопротивление воздуха: почему 130 км/ч дороже 90",
   "Air drag and power",
   "Ауа кедергісі және қуат"
  ],
  "guide": [
   "Удвой скорость при неизменной форме автомобиля. Аэродинамическая сила растёт вчетверо, а мощность против неё — в восемь раз. Отдели её от потерь на качение.",
   "Double speed without changing shape. Air drag quadruples and the power spent on it rises eightfold. Distinguish this from rolling losses.",
   "Пішінді сақтап, жылдамдықты екі еселе. Ауа кедергі күші төрт, оған жұмсалатын қуат сегіз есе артады. Домалау шығынын бөлек қара."
  ]
 },
 "lever": {
  "lesson": "7.35",
  "title": [
   "Рычаг и правило моментов",
   "Lever moments",
   "Иінтірек моменттері"
  ],
  "guide": [
   "Сдвинь точку приложения усилия дальше от оси. Уменьши силу так, чтобы восстановить равновесие: какая величина осталась прежней?",
   "Increase the effort arm and reduce force until balance returns. Which quantity stayed fixed?",
   "Күш иінін ұзартып, тепе-теңдік қалпына келгенше күшті азайт. Қай шама сақталды?"
  ]
 },
 "efficiency": {
  "lesson": "7.36",
  "title": [
   "КПД: куда уходит энергия",
   "Useful power and losses",
   "Пайдалы қуат және шығын"
  ],
  "guide": [
   "Выбери два устройства с одинаковой полезной мощностью. Сравни затраченную мощность: меньший КПД требует большего подвода энергии.",
   "Choose two devices with the same useful power. Compare input power: lower efficiency needs a larger input.",
   "Пайдалы қуаты бірдей екі құрылғыны таңда. Кіріс қуатын салыстыр: ПӘК төмен болса, көбірек энергия қажет."
  ]
 },
 "ohm": {
  "lesson": "8.30",
  "title": [
   "Закон Ома и перегрузка сети",
   "Circuit overload",
   "Тізбектің артық жүктемесі"
  ],
  "guide": [
   "На виртуальном стенде уменьши сопротивление при постоянном напряжении. Сопоставь рост тока с показанием перегрузки; не повторяй опыт с бытовой сетью.",
   "On the virtual bench reduce resistance at fixed voltage. Compare current with the overload indicator; do not try this on mains wiring.",
   "Виртуалды стендте кернеуді сақтап, кедергіні азайт. Токты артық жүктеме белгісімен салыстыр. Тұрмыстық желіде қайталама."
  ]
 },
 "music": {
  "lesson": "11.12",
  "title": [
   "Струна: натяжение, длина и нота",
   "A vibrating string",
   "Тербелетін ішек"
  ],
  "guide": [
   "Укороти звучащую часть струны вдвое при прежнем натяжении. Посмотри, как изменились длина стоячей волны и основная частота.",
   "Halve the vibrating length at fixed tension. Compare standing wavelength and fundamental frequency.",
   "Керілуді сақтап, ішектің тербелетін бөлігін екі есе қысқарт. Тұрғын толқын ұзындығы мен негізгі жиілікті салыстыр."
  ]
 },
 "shadow": {
  "lesson": "8.37",
  "title": [
   "Геометрия тени: свет и светотень",
   "Light and shadow",
   "Жарық пен көлеңке"
  ],
  "guide": [
   "Замени точечный источник протяжённым. Проследи крайние лучи: где закрыт весь источник, а где только его часть?",
   "Switch from a point source to an extended one. Trace the boundary rays: where is all the source blocked, and where only part?",
   "Нүктелік көзді созылыңқы көзге ауыстыр. Шеткі сәулелерді бақыла: қай жерде көз түгел, қай жерде жартылай жабық?"
  ]
 },
 "weber": {
  "lesson": "7.4",
  "title": [
   "Ощущение и стимул: закон Вебера",
   "Sensing versus measuring",
   "Сезу және өлшеу"
  ],
  "guide": [
   "Дай одинаковую прибавку слабому и сильному стимулу. Ощущение зависит от относительного изменения: поэтому впечатление не заменяет измерительный прибор.",
   "Add the same increment to a weak and a strong stimulus. Perception depends on relative change: a sensation is not a calibrated instrument.",
   "Әлсіз және күшті әсерге бірдей өсім қос. Сезіну салыстырмалы өзгеріске тәуелді, сондықтан ол өлшеу құралын алмастырмайды."
  ]
 },
 "binary": {
  "lesson": "11.16",
  "title": [
   "Нули и единицы: точность измерения",
   "Digitising a measurement",
   "Өлшемді цифрлау"
  ],
  "guide": [
   "Измени напряжение на малую величину. Меняется ли цифровой код каждый раз? Конечное число уровней делает результат ступенчатым.",
   "Change voltage slightly. Does the code always change? A finite set of levels makes the digital result stepwise.",
   "Кернеуді сәл өзгерт. Код әр кезде өзгере ме? Деңгейлер саны шектеулі болғандықтан нәтиже сатылы болады."
  ]
 },
 "timeline": {
  "lesson": "10.1",
  "title": [
   "Хронология: физика меняет мир",
   "From discoveries to technology",
   "Жаңалықтан технологияға"
  ],
  "guide": [
   "Выбери два открытия из разных веков. Для каждого назови наблюдение или закон и отдельно устройство, которое стало возможным благодаря ему.",
   "Choose two discoveries from different centuries. For each distinguish the observation or law from a device it made possible.",
   "Екі ғасырдан екі жаңалық таңда. Әрқайсысында бақылау не заңды және соның арқасында жасалған құрылғыны ажырат."
  ]
 },
 "text": {
  "lesson": "7.1",
  "title": [
   "Физика в художественном тексте",
   "Physics in a story",
   "Әңгімедегі физика"
  ],
  "guide": [
   "Прочитай описание явления, прежде чем открывать разбор. Какое слово в тексте указывает на физический процесс и какую величину можно измерить?",
   "Read the scene before revealing the explanation. Which word identifies the physical process, and what could you measure?",
   "Түсіндірмені ашпай тұрып үзіндіні оқы. Қай сөз физикалық процесті білдіреді және қандай шаманы өлшеуге болады?"
  ]
 },
 "binocular": {
  "lesson": "8.42",
  "title": [
   "Опыт: бинокулярное зрение и объём",
   "Stereo vision",
   "Бинокулярлық көру"
  ],
  "guide": [
   "Приближай предмет, не меняя расстояние между глазами. Разница двух изображений увеличивается — это подсказка о глубине.",
   "Bring the object closer at fixed eye spacing. The growing disparity between the images is a depth cue.",
   "Көздердің аралығын сақтап, денені жақындат. Екі кескін айырмасы артады — бұл тереңдік белгісі."
  ]
 },
 "heating": {
  "lesson": "8.7",
  "title": [
   "Сколько теплоты нужно, чтобы вскипятить воду",
   "Heating water",
   "Суды қыздыру"
  ],
  "guide": [
   "Сначала удвой массу воды, затем мощность. Для той же разности температур первая замена увеличивает время, вторая его уменьшает. Проверь при одинаковых потерях.",
   "Double water mass, then heater power. For the same temperature rise the first change lengthens heating, the second shortens it. Keep losses fixed.",
   "Алдымен су массасын, кейін қуатты екі еселе. Бірдей температура өзгерісінде біріншісі уақытты арттырады, екіншісі қысқартады. Шығынды өзгертпе."
  ]
 },
 "breath": {
  "lesson": "10.21",
  "title": [
   "Дыхание: парциальное давление и гемоглобин",
   "Partial pressure in breathing",
   "Тыныстағы парциал қысым"
  ],
  "guide": [
   "Подними высоту, не меняя объём вдоха. Доля кислорода и его парциальное давление — не одно и то же. Как ведёт себя давление, когда снижается общее?",
   "Raise altitude without changing breath volume. Oxygen fraction is not oxygen partial pressure. What happens as total pressure drops?",
   "Тыныс көлемін сақтап, биіктікті арттыр. Оттектің үлесі мен парциал қысымы бірдей емес. Жалпы қысым төмендесе, не өзгереді?"
  ]
 },
 "scale": {
  "lesson": "7.3",
  "title": [
   "Масштаб: как измерить расстояние на карте",
   "Map scale and units",
   "Карта масштабы мен бірліктер"
  ],
  "guide": [
   "Возьми один отрезок и смени масштаб. Сначала умножь длину на знаменатель масштаба, затем переведи сантиметры в километры. Сверь обе операции.",
   "Keep the map segment fixed and change scale. First multiply by the scale denominator, then convert centimetres to kilometres.",
   "Кесіндіні сақтап, масштабты өзгерт. Алдымен ұзындықты масштаб бөліміне көбейт, содан кейін сантиметрді километрге айналдыр."
  ]
 },
 "echo": {
  "lesson": "9.30",
  "title": [
   "Эхо, эхолот и сейсмика: расстояние по времени",
   "Echo travel time",
   "Жаңғырық уақыты"
  ],
  "guide": [
   "Сохрани расстояние и смени среду. Измеряется путь туда и обратно: более быстрое распространение означает меньшую задержку, а не меньшую глубину.",
   "Keep distance fixed and switch media. Time covers the round trip: a faster wave gives a shorter delay, not a shallower bed.",
   "Қашықтықты сақтап, ортаны ауыстыр. Уақыт барып-қайту жолына қатысты: жылдам толқын аз кідіреді, тереңдік өзгермейді."
  ]
 },
 "truss": {
  "lesson": "10.27",
  "title": [
   "Ферма моста: почему треугольник прочнее квадрата",
   "Bridge truss",
   "Көпір фермасы"
  ],
  "guide": [
   "Сделай ферму ниже при той же нагрузке. У пологих стержней меньше вертикальная составляющая на каждый ньютон продольного усилия: что покажет расчёт напряжения?",
   "Lower the truss under the same load. A flatter bar gives less vertical support per newton of axial force. What happens to stress?",
   "Жүктемені сақтап, ферманы аласарт. Көлбеуі аз өзектің әр ньютон күшіне тік құраушы азырақ келеді. Кернеу қалай өзгереді?"
  ]
 },
 "noise": {
  "lesson": "9.30",
  "title": [
   "Шум: децибелы, здоровье и экология",
   "Sound level and distance",
   "Дыбыс деңгейі мен арақашықтық"
  ],
  "guide": [
   "Удвой расстояние от источника и сравни децибелы. Это логарифмическая шкала: половина числа на ней не означает половину интенсивности.",
   "Double the source distance and compare decibels. This scale is logarithmic: half the reading does not mean half the intensity.",
   "Көзге дейінгі аралықты екі еселе де децибелді салыстыр. Шкала логарифмдік: санның жартысы қарқынның жартысы емес."
  ]
 },
 "orders": {
  "lesson": "7.5",
  "title": [
   "Порядки величин: от атома до Вселенной",
   "Powers of ten",
   "Онның дәрежелері"
  ],
  "guide": [
   "Оставь мантиссу прежней и прибавь единицу к показателю степени. Как изменится величина? Проверь на двух разных порядках.",
   "Keep the mantissa and increase the exponent by one. How does the value change? Check at two different scales.",
   "Мантиссаны сақтап, дәреже көрсеткішіне бір қос. Шама қалай өзгереді? Екі түрлі ретте тексер."
  ]
 },
 "parallax": {
  "lesson": "9.12",
  "title": [
   "Параллакс: измерить расстояние по углу",
   "Parallax rangefinder",
   "Параллакс арқылы қашықтық"
  ],
  "guide": [
   "При одном базисе уменьши угол вдвое. Для малых углов расстояние почти удвоится: близкий предмет сильнее смещается на фоне далёкого.",
   "At fixed baseline halve the angle. At small angles distance nearly doubles: a nearby object shifts more against its background.",
   "Базисті сақтап, бұрышты екі есе азайт. Кіші бұрышта қашықтық шамамен екі еселенеді: жақын дене фонда көбірек ығысады."
  ]
 },
 "buoyancy": {
  "lesson": "7.28",
  "title": [
   "Закон Архимеда: что плавает, а что тонет",
   "Buoyancy tank",
   "Архимед күші тәжірибесі"
  ],
  "guide": [
   "Не меняя объём и материал тела, замени жидкость. Сравни вес вытесненной жидкости и силу тяжести тела до вывода о плавании.",
   "Keep body volume and material fixed, then change liquid. Compare displaced liquid weight with body weight before predicting flotation.",
   "Дене көлемі мен затын сақтап, сұйықты ауыстыр. Жүзуін болжау үшін ығыстырылған сұйық салмағы мен дененің ауырлық күшін салыстыр."
  ]
 },
 "rainbow": {
  "lesson": "11.19",
  "title": [
   "Радуга: дисперсия, капля и геометрия",
   "Rainbow optics",
   "Кемпірқосақ оптикасы"
  ],
  "guide": [
   "Сравни лучи разных цветов в капле. Угол преломления зависит от длины волны; внутреннее отражение возвращает часть света к наблюдателю.",
   "Compare different colours in a drop. Refraction depends on wavelength; internal reflection returns part of the light toward the observer.",
   "Тамшыдағы әр түстің сәулесін салыстыр. Сыну толқын ұзындығына тәуелді, ішкі шағылу жарықтың бір бөлігін бақылаушыға қайтарады."
  ]
 },
 "windmill": {
  "lesson": "11.11",
  "title": [
   "Ветрогенератор: сколько энергии в ветре",
   "Power from wind",
   "Желден алынатын қуат"
  ],
  "guide": [
   "Не меняя ротор, удвой скорость ветра. Воздух несёт больше кинетической энергии на килограмм, и через диск в секунду проходит больше массы: вместе это даёт кубическую зависимость.",
   "Double wind speed at fixed rotor size. Both energy per kilogram and mass flow rise, producing a cubic power dependence.",
   "Роторды сақтап, жел жылдамдығын екі еселе. Бір килограммның энергиясы да, секундтағы масса да өседі: қуат жылдамдықтың кубына тәуелді."
  ]
 },
 "photosynth": {
  "lesson": "7.32",
  "title": [
   "Фотосинтез: свет превращается в еду",
   "Light energy in plants",
   "Өсімдіктегі жарық энергиясы"
  ],
  "guide": [
   "Усиль свет при неизменной концентрации CO₂. Найди участок, где отдача растёт слабо: поступившая энергия и запасённая химическая энергия различаются.",
   "Increase light at fixed CO₂. Look for diminishing gains: incident energy and stored chemical energy are not the same.",
   "CO₂ мөлшерін сақтап, жарықты күшейт. Өсім баяулайтын бөлікті тап: түскен энергия мен жиналған химиялық энергия тең емес."
  ]
 },
 "greenhouse": {
  "lesson": "8.17",
  "title": [
   "Парниковый эффект: энергетический баланс Земли",
   "Earth’s energy budget",
   "Жердің энергия теңгерімі"
  ],
  "guide": [
   "Измени только альбедо. Чем больше света отражается, тем меньше энергии поглощается. Затем сравни с изменением CO₂: это другой механизм.",
   "Change albedo alone. More reflection means less absorbed energy. Compare with changing CO₂, which acts through a different mechanism.",
   "Тек альбедоны өзгерт. Шағылу артса, жұтылған энергия азаяды. Содан кейін CO₂ өзгерісімен салыстыр: оның механизмі бөлек."
  ]
 },
 "polyspast": {
  "lesson": "7.33",
  "title": [
   "Полиспаст: как выиграть в силе",
   "Block and tackle",
   "Полиспаст"
  ],
  "guide": [
   "Добавь подвижный блок. Чтобы поднять груз на ту же высоту меньшей силой, придётся вытянуть больше верёвки. Сравни идеальный результат с учётом потерь.",
   "Add a moving pulley. Lifting the same load through the same height with less force requires pulling more rope. Compare ideal and lossy cases.",
   "Жылжымалы блок қос. Жүкті сол биіктікке аз күшпен көтеру үшін көбірек арқан тартасың. Идеал және шығынды жағдайды салыстыр."
  ]
 },
 "circuit": {
  "lesson": "8.26",
  "title": [
   "Соединение проводников: дома и в приборе",
   "Series and parallel circuits",
   "Тізбектей және параллель тізбек"
  ],
  "guide": [
   "Переключи соединение, сохранив источник и оба резистора. В каком случае общий ток разделяется, а в каком один ток проходит через оба элемента?",
   "Switch topology without changing source or resistors. When does the current split, and when does the same current pass both elements?",
   "Көз бен екі кедергіні сақтап, қосылу түрін өзгерт. Қай жағдайда ток бөлінеді, қай кезде екі элементтен бірдей ток өтеді?"
  ]
 },
 "thermalexp": {
  "lesson": "8.2",
  "title": [
   "Тепловое расширение: зачем рельсам зазор",
   "Expansion joints",
   "Жылулық саңылаулар"
  ],
  "guide": [
   "Оставь материал прежним и удвой длину рельса. При одинаковом нагреве удлинение тоже удвоится: сравни его с шириной зазора.",
   "Double rail length without changing material. For the same warming the expansion doubles. Compare it with the gap width.",
   "Материалды сақтап, рельс ұзындығын екі еселе. Бірдей қызуда ұзару да екі еселенеді. Оны саңылау енімен салыстыр."
  ]
 },
 "magnetfield": {
  "lesson": "11.47",
  "title": [
   "Магнитное поле Земли: компас и сияния",
   "Compass and aurora",
   "Компас және шұғыла"
  ],
  "guide": [
   "Сравни направление поля на экваторе и ближе к магнитному полюсу. Различай горизонтальное направление стрелки и наклон поля к поверхности.",
   "Compare the field at the equator and near a magnetic pole. Distinguish compass heading from field inclination to the surface.",
   "Экватордағы және магнит полюсіне жақын өрісті салыстыр. Компастың көлденең бағыты мен өрістің бетке көлбеуін ажырат."
  ]
 },
 "measure": {
  "lesson": "10.2",
  "title": [
   "Измерения: среднее, разброс, погрешность",
   "Repeated measurements",
   "Қайталама өлшеулер"
  ],
  "guide": [
   "Увеличь число измерений при постоянном смещении прибора. Разброс среднего уменьшается, но повторение само по себе не исправляет систематическую ошибку.",
   "Increase sample size with a fixed instrument bias. The uncertainty of the mean falls, but repetition alone cannot remove systematic error.",
   "Аспап ығысуын сақтап, өлшеу санын арттыр. Орташа мәннің белгісіздігі азаяды, бірақ қайталау жүйелік қатені жоймайды."
  ]
 }
};
