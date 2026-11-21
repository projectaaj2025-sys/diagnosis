// Original introductory theory, with independent optional concept explanations and historical notes.
const lessonFoundations = [
  ["nature", ["Физическое тело — отдельный предмет, а вещество — то, из чего он состоит. Стальной гвоздь и стальная игла — разные тела из одного вещества.", "An object is an individual thing; a substance is the material it consists of. A steel nail and a steel needle are different objects made from the same material.", "Физикалық дене — жеке нәрсе, зат — оның материалы. Болат шеге мен болат ине — бір заттан жасалған екі дене."]],
  ["method", ["Наблюдение — изучение явления без намеренного изменения условий. В эксперименте исследователь сам меняет условие и сравнивает результат. Записывать сроки замерзания озера — наблюдение; охлаждать одинаковые пробы воды при разных условиях — эксперимент.", "Observation studies a phenomenon without deliberately changing conditions. In an experiment the investigator controls a condition and compares outcomes. Recording when a lake freezes is observation; cooling comparable water samples under different conditions is an experiment.", "Бақылау — жағдайларды әдейі өзгертпей құбылысты зерттеу. Тәжірибеде зерттеуші бір шартты өзгертіп, нәтижелерді салыстырады. Көлдің қату мерзімін жазу — бақылау, бірдей су үлгілерін әртүрлі жағдайда салқындату — тәжірибе."]],
  ["si", ["Единица измерения — согласованный образец величины. В СИ длину выражают в метрах, площадь — в квадратных метрах. Квадрат со стороной километр содержит тысячу рядов по тысяче квадратных метров: перевод площади требует возвести коэффициент перевода длины в квадрат.", "A unit is an agreed reference for a quantity. SI measures length in metres and area in square metres. A square kilometre contains a thousand rows of a thousand square metres: square the length conversion factor for area.", "Өлшем бірлігі — шаманың келісілген үлгісі. SI жүйесінде ұзындық метрмен, аудан шаршы метрмен өлшенеді. Бір шаршы километрде мың қатардың әрқайсысында мың шаршы метр бар: ауданды аударғанда ұзындық коэффициенті квадратталады."]],
  ["vector", ["Скаляр задаётся числом и единицей, а вектору требуется ещё направление. Два одинаковых по длине шага в разные стороны увеличивают путь, но могут дать нулевое перемещение.", "A scalar needs a number and a unit; a vector also needs direction. Two equal steps in opposite directions add to the distance but can give zero displacement.", "Скаляр санмен және бірлікпен беріледі, векторға бағыт та қажет. Қарама-қарсы екі тең қадам жолды ұлғайтады, бірақ орын ауыстыру нөл болуы мүмкін."]],
  ["error", ["Погрешность характеризует неопределённость измерения. Запись результата с интервалом сообщает больше, чем много знаков после запятой. Для очень малых чисел используют стандартный вид: множитель от единицы до десяти, не включая десять, умножают на степень десяти.", "Measurement uncertainty expresses how precisely a value is known. An interval tells more than extra decimal places. Scientific notation writes a small number as a factor from one up to but not including ten times a power of ten.", "Өлшеу қатесі шаманың қаншалықты дәл белгілі екенін сипаттайды. Аралық артық ондық таңбалардан пайдалырақ. Стандарт түрде сан бірден онға дейінгі (он кірмейді) көбейткіш пен онның дәрежесінің көбейтіндісімен жазылады."]],
  ["frame relative", ["Механическое движение — изменение положения тела относительно другого тела с течением времени. Система отсчёта включает тело отсчёта, координатные оси и часы. Пассажир в кресле покоится относительно вагона, но движется относительно станции.", "Mechanical motion is a change of position relative to another body over time. A reference frame includes a reference body, coordinates and a clock. A seated passenger is at rest relative to the carriage but moving relative to the station.", "Механикалық қозғалыс — дененің басқа денеге қатысты орнының уақыт бойынша өзгеруі. Санақ жүйесіне санақ денесі, координаталар және сағат кіреді. Отырған жолаушы вагонға қатысты тыныш, стансаға қатысты қозғалады."]],
  ["uniform avg graph", ["Скорость связывает путь со временем. При равномерном движении за любые равные промежутки проходят равные пути. Для средней путевой скорости складывают весь путь и делят на всё время, включая остановки. На графике скорости площадь под линией даёт путь, если скорость взята по модулю.", "Speed relates distance to time. Uniform motion covers equal distances in any equal time intervals. Average speed divides total distance by total time, including stops. The area under a speed–time curve gives distance travelled.", "Жылдамдық жол мен уақытты байланыстырады. Бірқалыпты қозғалыста кез келген тең уақыт ішінде тең жол жүреді. Орташа жолдық жылдамдыққа барлық жолды аялдауды қоса алғандағы уақытқа бөледі. Жылдамдық модулі графигінің астындағы аудан жолды береді."]],
  ["mass volume density", ["Масса характеризует инертность тела, объём — занимаемое им пространство, плотность — массу единицы объёма. У двух брусков одного объёма массы могут различаться: одинаковые размеры не означают одинаковое вещество.", "Mass measures inertia, volume is the space occupied, and density is mass per unit volume. Equal-sized blocks can have different masses: equal dimensions do not imply the same material.", "Масса дененің инерттілігін, көлем алатын орнын, тығыздық бірлік көлемдегі массаны сипаттайды. Көлемі бірдей білеушелердің массасы әртүрлі болуы мүмкін."]],
  ["inertia force net newton", ["Сила — векторная мера взаимодействия тел. Для одного тела все действующие на него силы складывают с учётом направления. Равнодействующая меняет скорость; если она нулевая, в инерциальной системе тело может не только покоиться, но и двигаться равномерно по прямой.", "Force is a vector measure of interaction. Add the forces acting on one body with their directions. A net force changes velocity; if it is zero, a body in an inertial frame can remain at rest or move uniformly in a straight line.", "Күш — денелер әсерлесуінің векторлық өлшемі. Бір денеге әсер ететін күштерді бағытын ескеріп қосады. Қорытқы күш жылдамдықты өзгертеді; ол нөл болса, инерциялық жүйеде дене тыныштықта не түзу сызықты бірқалыпты қозғалыста болады."]],
  ["gravity weightless", ["Сила тяжести действует на само тело, а вес — сила, с которой тело действует на опору или подвес. В свободном падении опора падает вместе с телом: давление на неё исчезает, хотя притяжение Земли сохраняется.", "Gravity acts on the body, whereas its apparent weight is the force it exerts on a support. In free fall the support falls with the body: the support load vanishes but gravity remains.", "Ауырлық күші дененің өзіне әсер етеді, ал салмақ — дененің тірекке не аспаға түсіретін күші. Еркін құлағанда тірек те бірге құлайды: тірекке түсетін күш жоғалады, Жердің тартылысы сақталады."]],
  ["deform hooke solid", ["Деформация — изменение формы или размеров тела. Если после снятия нагрузки исходная форма восстанавливается, деформация упругая; оставшееся изменение называют пластическим. В пределах пропорциональности сила упругости растёт вместе с удлинением и направлена против смещения.", "Deformation changes shape or size. Elastic deformation disappears when the load is removed; plastic deformation remains. In the proportional range restoring force grows with extension and opposes displacement.", "Деформация — дене пішінінің не өлшемінің өзгеруі. Жүк алынғанда бастапқы пішін қайтса, деформация серпімді; өзгеріс қалса, пластикалық. Пропорционалдық шегінде серпімділік күші ұзарумен өсіп, ығысуға қарсы бағытталады."]],
  ["friction", ["Трение покоя препятствует началу относительного скольжения. Его величина не всегда равна предельной: пока ящик не сдвинулся, трение может уравновешивать небольшую тягу. При скольжении действует уже трение скольжения.", "Static friction resists the onset of relative sliding. Its magnitude is not always the limiting value: before a crate moves, friction can balance a small pull. Once it slides, kinetic friction acts.", "Тыныштық үйкелісі салыстырмалы сырғанаудың басталуына кедергі жасайды. Ол әрқашан шекті мәнге тең емес: жәшік жылжымағанша шағын тарту күшін теңестіре алады. Сырғанағанда сырғанау үйкелісі әсер етеді."]],
  ["state diff mkt", ["Вещество состоит из частиц, находящихся в непрерывном тепловом движении. Диффузия — их взаимное проникновение при таком движении. Видимая в микроскоп пылинка гораздо крупнее молекулы: её беспорядочные толчки служат косвенным свидетельством ударов окружающих молекул.", "Matter consists of particles in continuous thermal motion. Diffusion is their intermingling due to this motion. A speck visible under a microscope is much larger than a molecule: its erratic jolts indirectly reveal molecular impacts.", "Зат үздіксіз жылулық қозғалыстағы бөлшектерден тұрады. Диффузия — осы қозғалыс нәтижесінде бөлшектердің өзара енуі. Микроскоптағы тозаң молекуладан әлдеқайда ірі: ретсіз серпілістері молекула соққыларын жанама көрсетеді."]],
  ["pressure hydro utube press manometer air", ["Давление показывает, какая нормальная сила приходится на единицу площади. В покоящейся жидкости давление растёт с глубиной: нижние слои несут вес верхних. Добавочное внешнее давление передаётся во все стороны — поэтому поршень может действовать на другой поршень через жидкость.", "Pressure is normal force per unit area. In a resting liquid it increases with depth because lower layers support the ones above. An added external pressure is transmitted in all directions, so a piston can act on another through the liquid.", "Қысым — бірлік ауданға түсетін нормаль күш. Тыныш сұйықта төменгі қабаттар жоғарғы қабаттардың салмағын көтеретіндіктен қысым тереңдікпен өседі. Сыртқы қосымша қысым барлық бағытқа беріліп, бір поршень екіншісіне сұйық арқылы әсер етеді."]],
  ["buoy float", ["Выталкивающая сила возникает из-за разности давлений снизу и сверху. Она равна весу вытесненной жидкости. При свободном плавании тело погружается настолько, чтобы эта сила уравновесила силу тяжести.", "Buoyancy arises because pressure below exceeds pressure above. It equals the weight of displaced fluid. A freely floating object settles until buoyancy balances gravity.", "Кері итеруші күш төменгі және жоғарғы қысым айырмасынан туады. Ол ығыстырылған сұйықтың салмағына тең. Еркін жүзген дене осы күш ауырлық күшін теңестіргенше батады."]],
  ["work energy conserve eff machine", ["Работа — передача энергии силой при перемещении. Кинетическая энергия связана с движением, потенциальная — с взаимным положением тел. Механизм может уменьшить необходимую силу за счёт большего пути; он не создаёт энергию. КПД сравнивает полезный результат с затратой.", "Work transfers energy when a force acts through displacement. Kinetic energy is associated with motion and potential energy with configuration. A machine can trade a longer distance for a smaller force; it cannot create energy. Efficiency compares useful output to input.", "Жұмыс — орын ауыстырғанда күш арқылы энергияның берілуі. Кинетикалық энергия қозғалысқа, потенциалдық энергия денелердің өзара орнына байланысты. Механизм күшті азайту үшін жолды ұлғайтады, энергия жасамайды. ПӘК пайдалы нәтижені жұмсалған энергиямен салыстырады."]],
  ["centre lever stable", ["Центр масс — точка, положение которой определяется распределением массы. Момент силы характеризует её способность поворачивать тело и зависит от перпендикулярного расстояния от оси до линии действия силы. При устойчивом равновесии малое отклонение вызывает возвращающее действие.", "The centre of mass locates the mass distribution. Torque measures the turning effect of a force and depends on the perpendicular distance from axis to line of action. In stable equilibrium a small displacement produces a restoring action.", "Масса центрінің орны массаның таралуына байланысты. Күш моменті айналдыру әсерін сипаттайды және осьтен күш сызығына дейінгі перпендикуляр қашықтыққа тәуелді. Орнықты тепе-теңдікте шағын ауытқу қайтарушы әсер туғызады."]],
  ["astro solar sky planets", ["Астрономия изучает небесные тела и их системы. Планета обращается вокруг звезды, спутник — вокруг планеты. Видимая близость на небе означает лишь близкие направления наблюдения: расстояния от наблюдателя могут сильно отличаться.", "Astronomy studies celestial bodies and their systems. A planet orbits a star and a moon orbits a planet. Apparent proximity on the sky means similar viewing directions, not necessarily similar distances.", "Астрономия аспан денелері мен олардың жүйелерін зерттейді. Планета жұлдызды, серік планетаны айналады. Аспандағы жақындық тек бақылау бағыттарының ұқсастығын көрсетеді, қашықтықтар әртүрлі болуы мүмкін."]],
  ["calendar time coords", ["Суточное вращение Земли создаёт видимое движение светил. Высоту светила измеряют вверх от горизонта, а не от зенита. Солнечные сутки определяются вращением относительно Солнца, год — обращением вокруг него; год не равен целому числу суток.", "Earth’s rotation causes the apparent daily motion of celestial bodies. Altitude is measured upward from the horizon, not from the zenith. A solar day follows rotation relative to the Sun; a year follows the orbit and is not an integer number of days.", "Жердің айналуы шырақтардың көрінерлік тәуліктік қозғалысын тудырады. Шырақ биіктігі зениттен емес, көкжиектен саналады. Күн тәулігі Күнге қатысты айналыспен, жыл орбиталық қозғалыспен анықталады; жыл бүтін тәулік санына тең емес."]],
  ["temp stateeq isotherm", ["Температура характеризует тепловое состояние. При тепловом равновесии температуры равны, но внутренние энергии тел могут различаться. В газовых законах нужна абсолютная температура: нулю градусов Цельсия соответствует 273,15 К.", "Temperature describes thermal state. In thermal equilibrium temperatures agree, but internal energies can differ. Gas laws require absolute temperature: zero degrees Celsius corresponds to 273.15 K.", "Температура жылулық күйді сипаттайды. Жылулық тепе-теңдікте температуралар тең, ішкі энергиялар әртүрлі болуы мүмкін. Газ заңдарына абсолют температура қажет: Цельсийдің нөл градусы 273,15 К-ге тең."]],
  ["internal first workgas", ["Внутренняя энергия включает энергию движения и взаимодействия частиц, но не движение тела как целого. Её можно изменить теплопередачей или работой. Расширяющийся газ толкает поршень и отдаёт часть энергии окружающим телам.", "Internal energy includes particle motion and interactions, not motion of the whole body. Heat transfer or work can change it. An expanding gas pushes a piston and transfers energy to its surroundings.", "Ішкі энергия бөлшектер қозғалысы мен әсерлесуін қамтиды, бірақ дененің тұтас қозғалысын қамтымайды. Ол жылу алмасу не жұмыс арқылы өзгереді. Ұлғайған газ поршеньді итеріп, энергиясын ортаға береді."]],
  ["transfer insulate", ["Теплопроводность переносит энергию между соседними частями вещества без общего потока самого вещества. Конвекция переносит её вместе с движущейся жидкостью или газом. Излучение не нуждается в материальной среде: так солнечная энергия пересекает космическое пространство.", "Conduction transfers energy between neighbouring regions without bulk flow. Convection carries energy with moving fluid. Radiation needs no material medium, allowing sunlight to cross space.", "Жылуөткізгіштік энергияны заттың жалпы ағынынсыз көрші бөліктер арасында береді. Конвекцияда энергия сұйық не газ ағынымен тасымалданады. Сәулеге заттық орта қажет емес, сондықтан Күн энергиясы ғарыштан өте алады."]],
  ["heat balance fuel", ["Количество теплоты — энергия, переданная из-за разности температур. Удельная теплоёмкость показывает, сколько энергии нужно для нагрева единицы массы на один кельвин без фазового перехода. Удельная теплота сгорания, напротив, относится к химическому превращению топлива.", "Heat is energy transferred because of a temperature difference. Specific heat capacity is the energy needed per unit mass per kelvin without a phase change. Specific heat of combustion instead concerns a chemical transformation of fuel.", "Жылу мөлшері — температура айырмасынан берілген энергия. Меншікті жылусыйымдылық бірлік массаны фазалық ауысусыз бір кельвинге қыздыруға қажетті энергияны көрсетеді. Меншікті жану жылуы отынның химиялық өзгеруіне қатысты."]],
  ["cool melt vapour boil humidity", ["При фазовом переходе вещество меняет агрегатное состояние, а не химический состав. Испарение идёт со свободной поверхности, кипение — также внутри жидкости. Пузырьки пара могут расти, когда давление насыщенного пара достигает внешнего давления с учётом глубины.", "A phase change alters physical state rather than chemical composition. Evaporation occurs at the surface, boiling also within the liquid. Vapour bubbles can grow when saturation pressure reaches the surrounding pressure at their depth.", "Фазалық ауысуда химиялық құрам емес, агрегаттық күй өзгереді. Булану беттен, қайнау сұйық ішінде де жүреді. Қаныққан бу қысымы сол тереңдіктегі сыртқы қысымға жеткенде көпіршіктер өсе алады."]],
  ["second engine environment", ["Тепловой двигатель за цикл получает теплоту от нагревателя, совершает работу и отдаёт часть теплоты холодильнику. За полный цикл рабочее тело возвращается в исходное состояние. Поэтому работа равна разности полученной и отданной теплоты, а не всей поступившей энергии.", "A heat engine takes heat from a hot reservoir, does work and rejects heat to a cold reservoir. Its working substance returns to its initial state each cycle. Net work therefore equals heat received minus heat rejected, not the whole input.", "Жылу қозғалтқышы циклде қыздырғыштан жылу алып, жұмыс жасап, жылудың бір бөлігін салқындатқышқа береді. Жұмыс денесі бастапқы күйіне оралады. Сондықтан жұмыс барлық кіріс энергиясына емес, алынған және берілген жылу айырмасына тең."]],
  ["charge coulomb field", ["Электрический заряд — свойство частиц, определяющее их электрическое взаимодействие. Одноимённые заряды отталкиваются, разноимённые притягиваются. Напряжённость поля определяется силой на единичный положительный пробный заряд; для отрицательного заряда сила направлена противоположно полю.", "Electric charge determines electrical interaction. Like charges repel and unlike charges attract. Field strength is force per positive test charge; a negative charge experiences force opposite to the field.", "Электр заряды бөлшектердің электрлік әсерлесуін анықтайды. Аттас зарядтар тебіледі, әр аттас зарядтар тартылады. Кернеулік оң сынақ заряд бірлігіне түсетін күшпен анықталады; теріс зарядқа күш өріске қарсы бағытталады."]],
  ["potential equip capacitor capenergy fluxE shield", ["Потенциал — потенциальная энергия единичного положительного заряда в данной точке при выбранном нуле энергии. Разность потенциалов показывает работу поля на единицу заряда. На эквипотенциальной поверхности эта разность равна нулю, поэтому при движении вдоль неё поле не совершает работы.", "Potential is potential energy per unit positive charge at a point for a chosen zero. A potential difference describes field work per charge. Along an equipotential surface the difference is zero, so the field does no work along it.", "Потенциал — таңдалған нөлге қатысты нүктедегі бірлік оң зарядтың потенциалдық энергиясы. Потенциалдар айырымы бірлік зарядқа өріс жасайтын жұмысты сипаттайды. Эквипотенциал бет бойында айырма нөл, өріс жұмыс жасамайды."]],
  ["current meter ohm wire parallel power joule metal fuse emf full kirch", ["Сила тока показывает, какой заряд проходит через сечение проводника за единицу времени. Напряжение относится к двум точкам, ток — к ветви цепи. Поэтому амперметр включают в разрыв ветви, а вольтметр подключают к двум выводам элемента.", "Current is the charge crossing a conductor section per unit time. Voltage concerns two points; current concerns a branch. An ammeter is inserted in series and a voltmeter is connected across the two terminals of a component.", "Ток күші бірлік уақытта өткізгіш қимасынан өтетін зарядты көрсетеді. Кернеу екі нүктеге, ток тізбек тармағына қатысты. Амперметрді тармаққа тізбектей, вольтметрді элементтің екі ұшына қосады."]],
  ["electrolysis gascurrent semi", ["Ток возникает, когда носители заряда движутся направленно. В электролите носителями служат положительные и отрицательные ионы; в ионизированном газе имеются также свободные электроны. В полупроводнике удобно различать движение электронов и перемещение незаполненных состояний — дырок.", "Current arises from directed motion of charge carriers. Electrolytes conduct via positive and negative ions; ionized gases also contain free electrons. In a semiconductor one distinguishes electron motion from the motion of vacancies called holes.", "Ток заряд тасымалдаушылары бағытталып қозғалғанда туады. Электролитте оң және теріс иондар, иондалған газда қосымша еркін электрондар бар. Жартылай өткізгіште электрон қозғалысы мен кемтік деп аталатын бос орындардың қозғалысын ажыратады."]],
  ["magnet coil core ampere lorentz magmat", ["Магнитное поле обнаруживают по действию на магнитную стрелку или движущийся заряд. Проводник с током создаёт собственное поле. Его направление меняется при смене направления тока; это отличает магнитное действие тока от простого нагревания провода.", "A magnetic field is detected by its effect on a compass or moving charge. A current-carrying wire creates its own field. Reversing current reverses that field, unlike simple heating of the wire.", "Магнит өрісін тілшеге не қозғалған зарядқа әсерінен анықтайды. Тогы бар өткізгіш өз өрісін тудырады. Ток бағыты ауысқанда өріс те кері бұрылады; бұл оны сымның жай қызуынан ажыратады."]],
  ["induce lenz generator inductance motor transform", ["Магнитный поток характеризует поле, проходящее через выбранную поверхность, и зависит от её ориентации. При изменении потока через контур возникает ЭДС индукции. Поле индуцированного тока противодействует изменению потока, а не обязательно самому исходному полю.", "Magnetic flux describes the field through a chosen surface and depends on its orientation. Changing flux through a loop induces an emf. The induced current opposes the change in flux, not necessarily the original field itself.", "Магнит ағыны таңдалған беттен өтетін өрісті сипаттап, бет бағдарына тәуелді. Контур ағыны өзгерсе, индукция ЭҚК пайда болады. Индукциялық ток бастапқы өрістің өзіне емес, ағын өзгерісіне қарсы әсер етеді."]],
  ["shadow reflect mirror", ["Световой луч — модель направления распространения света. В однородной прозрачной среде луч идёт прямо, у зеркала меняет направление. Углы падения и отражения отсчитывают от перпендикуляра к поверхности в точке падения, а не от самой поверхности.", "A ray models the direction of light propagation. It travels straight in a uniform transparent medium and changes direction at a mirror. Measure incidence and reflection angles from the perpendicular at the point of incidence, not from the surface.", "Сәуле — жарықтың таралу бағытының моделі. Біртекті мөлдір ортада ол түзу таралып, айнада бағытын өзгертеді. Түсу және шағылу бұрыштары беттен емес, түсу нүктесіндегі перпендикулярдан өлшенеді."]],
  ["refract lens eye instrument disp", ["Преломление — изменение направления света при косом переходе в среду с другой скоростью распространения. Линза использует преломление на своих поверхностях. Если сами лучи сходятся, изображение можно получить на экране; если сходятся лишь их продолжения, изображение мнимое.", "Refraction changes the direction of oblique light entering a medium with a different propagation speed. A lens refracts at its surfaces. A real convergence can be recorded on a screen; a meeting of backward ray extensions gives a virtual image.", "Сыну — жарықтың таралу жылдамдығы басқа ортаға көлбеу өткенде бағытының өзгеруі. Линза беттерінде сәуле сынады. Сәулелердің өзі жиналса шын кескін экранға түседі, тек жалғастары қиылысса кескін жалған."]],
  ["acc accdist fall throw", ["Ускорение — изменение вектора скорости за единицу времени. Знак проекции ускорения зависит от выбора оси: отрицательная проекция не всегда означает замедление. В свободном полёте без сопротивления вертикальная составляющая скорости меняется, а горизонтальная остаётся постоянной.", "Acceleration is change in velocity per unit time. A negative component depends on the chosen axis and does not always mean slowing down. In free flight without drag the vertical velocity changes while the horizontal component stays fixed.", "Үдеу — бірлік уақыттағы жылдамдық векторының өзгерісі. Проекция таңбасы оське тәуелді: теріс үдеу әрқашан баяулауды білдірмейді. Кедергісіз ұшуда тік жылдамдық өзгереді, көлденең құраушы тұрақты."]],
  ["circle centrip grav orbit kepler", ["При движении по окружности скорость направлена по касательной, а нормальное ускорение — к центру кривизны. Даже при постоянном модуле скорости её вектор меняется. На круговой орбите роль направленной к центру силы играет тяготение, а не дополнительная особая сила.", "For circular motion velocity is tangent and normal acceleration points toward the centre of curvature. Even constant speed means changing velocity direction. On a circular orbit gravity itself supplies the inward force, not an extra special force.", "Шеңберлік қозғалыста жылдамдық жанамамен, нормаль үдеу қисықтық центріне бағытталады. Жылдамдық модулі өзгермесе де вектор бағыты өзгереді. Дөңгелек орбитада центрге бағытталған күшті қосымша күш емес, тартылыс қамтамасыз етеді."]],
  ["parallax", ["Параллакс — видимое смещение близкого объекта на фоне далёких при изменении точки наблюдения. Чем дальше объект при той же базе, тем меньше угол. В годичном параллаксе за базу для угла принимают одну астрономическую единицу.", "Parallax is the apparent shift of a nearby object against a distant background when the viewpoint changes. For a fixed baseline, more distant objects give smaller angles. The annual parallax angle uses a baseline of one astronomical unit.", "Параллакс — бақылау орны ауысқанда жақын дененің алыс фонға қатысты көрінерлік ығысуы. Бірдей базада нысан алыстаған сайын бұрыш кішірейеді. Жылдық параллакс бұрышының базасы — бір астрономиялық бірлік."]],
  ["third momentum jet", ["Импульс тела — произведение массы на вектор скорости. При взаимодействии двух тел силы равны по модулю и противоположны, но приложены к разным телам. Если внешний импульс пренебрежимо мал, изменения импульсов частей компенсируются в общей сумме.", "Momentum is mass times velocity. Interaction forces on two bodies are equal and opposite but act on different bodies. With negligible external impulse, changes of the parts' momenta cancel in the total.", "Дене импульсі — масса мен жылдамдық векторының көбейтіндісі. Екі дененің әсерлесу күштері тең әрі қарама-қарсы, бірақ әртүрлі денелерге түседі. Сыртқы күш импульсі елеусіз болса, бөліктер импульстерінің өзгерісі жалпы қосындыда өтеледі."]],
  ["period spring pendulum harmonic resonance", ["Колебание — повторяющееся движение около положения равновесия. Амплитуда — наибольший модуль смещения, период — время одного полного повторения. При гармонических колебаниях ускорение пропорционально смещению и направлено обратно: в крайней точке скорость равна нулю, но ускорение максимально по модулю.", "Oscillation is repeated motion about equilibrium. Amplitude is maximum displacement magnitude; period is the time of one full repeat. Harmonic acceleration is proportional and opposite to displacement: at a turning point speed is zero but acceleration magnitude is greatest.", "Тербеліс — тепе-теңдік маңындағы қайталанатын қозғалыс. Амплитуда — ең үлкен ығысу модулі, период — бір толық қайталану уақыты. Гармоникалық тербелісте үдеу ығысуға пропорционал әрі қарсы: шеткі нүктеде жылдамдық нөл, үдеу модулі ең үлкен."]],
  ["lc analogy rms react impedance acpower rlc", ["В колебательном контуре конденсатор запасает энергию электрического поля, а катушка — магнитного. При разряде энергия переходит из одной формы в другую. В цепи с источником переменного напряжения частота задаётся источником; совпадение с собственной частотой может вызвать резонанс.", "In an oscillating circuit a capacitor stores electric field energy and an inductor stores magnetic field energy. Discharge transfers energy between the two. In a driven circuit the source sets the frequency; matching the natural frequency can produce resonance.", "Тербелмелі контурда конденсатор электр, шарғы магнит өрісінің энергиясын жинайды. Разрядта энергия түрленеді. Айнымалы кернеу көзі жиілікті анықтайды; ол меншікті жиілікке теңескенде резонанс болуы мүмкін."]],
  ["wave echo stand interf emwave radio signals", ["Волна — распространение возмущения с передачей энергии. Частота показывает число повторений за секунду, длина волны — расстояние между ближайшими точками одинаковой фазы вдоль направления распространения. У механической волны частицы среды колеблются, но не бегут вслед за гребнем.", "A wave is a propagating disturbance that carries energy. Frequency counts cycles per second; wavelength is the spacing of nearest equal-phase points along propagation. In a mechanical wave medium particles oscillate rather than travel with the crest.", "Толқын — энергия тасымалдайтын ұйытқудың таралуы. Жиілік секундтағы қайталанулар санын, толқын ұзындығы таралу бағытындағы фазалары бірдей ең жақын нүктелер арасын көрсетеді. Механикалық толқында орта бөлшектері жалмен бірге жүрмей, тербеледі."]],
  ["thermal photonband spectra photo laser bohr dual lightp xray ximage", ["Фотон — квант электромагнитного излучения. Его энергия определяется частотой: более короткой длине волны в вакууме соответствует более энергичный фотон. Интенсивность пучка и энергия одного фотона — разные величины: можно увеличить число фотонов, не меняя их частоту.", "A photon is a quantum of electromagnetic radiation. Its energy depends on frequency: shorter vacuum wavelength means a more energetic photon. Beam intensity and single-photon energy are distinct; increasing photon count need not change frequency.", "Фотон — электромагниттік сәуленің кванты. Энергиясы жиілікке тәуелді: вакуумда қысқа толқынға энергиясы үлкен фотон сәйкес келеді. Шоқ қарқыны мен бір фотон энергиясы бөлек: фотон санын жиілікті өзгертпей арттыруға болады."]],
  ["rutherford nucleus reaction fission fusion reactor particle decay dose", ["Ядро — малая центральная часть атома, содержащая протоны и нейтроны. Число протонов определяет элемент, общее число нуклонов — массовое число. Изотопы одного элемента имеют одинаковый заряд ядра, но разное число нейтронов.", "The nucleus is the small central part of an atom containing protons and neutrons. Proton count identifies the element; total nucleon count is the mass number. Isotopes have the same nuclear charge but different neutron counts.", "Ядро — атомның протондар мен нейтрондардан тұратын шағын орталық бөлігі. Протон саны элементті, нуклондардың жалпы саны массалық санды анықтайды. Изотоптарда ядро заряды бірдей, нейтрон саны әртүрлі."]],
  ["model", ["Физическая модель — упрощённое описание, сохраняющее свойства, существенные для выбранного вопроса. У модели есть область применимости. Материальная точка помогает рассчитать путь поезда между городами, но не время прохождения всего состава мимо столба без учёта его длины.", "A physical model is a simplified description retaining properties essential to the question. It has a limited domain. A point model can describe a train’s intercity trip but cannot predict how long the whole train takes to pass a post without its length.", "Физикалық модель — сұраққа қажетті қасиеттерді сақтайтын ықшам сипаттама. Оның қолданылу шегі бар. Қалалар арасындағы пойыз жолын материалдық нүктемен сипаттауға болады, бірақ бағаннан толық өту уақыты үшін пойыз ұзындығы керек."]],
  ["inertia2 angular", ["Момент инерции описывает сопротивление изменению вращения вокруг данной оси. Важна не только масса, но и расстояние до оси: удалённая часть вносит больший вклад. Поэтому фигурист может ускорить вращение, приблизив руки к телу, если внешний момент мал.", "Moment of inertia measures resistance to changing rotation about a given axis. Both mass and distance from the axis matter: distant mass contributes more. A skater can spin faster by drawing arms inward if external torque is small.", "Инерция моменті берілген оське қатысты айналыстың өзгеруіне қарсылықты сипаттайды. Масса ғана емес, оське дейінгі қашықтық маңызды. Сыртқы момент аз болса, мәнерлеп сырғанаушы қолын денесіне жақындатып тезірек айналады."]],
  ["flow laminar stokes capillary", ["Вязкость — сопротивление жидкости относительному движению соседних слоёв. При ламинарном течении слои перемещаются упорядоченно; при турбулентном возникают вихри и интенсивное перемешивание. В стационарном потоке несжимаемой жидкости одинаковый объём проходит через каждое полное сечение трубы за одно и то же время.", "Viscosity resists relative motion of fluid layers. Laminar flow has orderly layers; turbulent flow has eddies and mixing. In steady incompressible flow the same volume crosses every full pipe section in equal time.", "Тұтқырлық — сұйықтың көрші қабаттарының салыстырмалы қозғалысына кедергісі. Ламинар ағыста қабаттар ретпен, турбулент ағыста құйындана араласып қозғалады. Сығылмайтын тұрақты ағыста бірдей уақытта түтіктің әр толық қимасынан бірдей көлем өтеді."]],
  ["digital", ["Оцифровка состоит из дискретизации по времени и квантования по уровню. Сначала измеряют сигнал в отдельные моменты, затем каждому измерению ставят в соответствие ближайший допустимый код. Добавочный бит удваивает число возможных уровней, но сам по себе не учащает измерения.", "Digitisation samples a signal in time and quantises its level. Measurements are taken at discrete instants, then assigned allowed codes. An extra bit doubles the number of possible levels but does not increase sampling frequency.", "Цифрландыру уақыт бойынша дискреттеу мен деңгей бойынша кванттаудан тұрады. Сигнал белгілі сәттерде өлшеніп, әр өлшемге рұқсат етілген код беріледі. Қосымша бит деңгей санын екі еселейді, бірақ өлшеу жиілігін арттырмайды."]],
  ["grating polar", ["Свет — поперечная электромагнитная волна. Поляризация описывает ориентацию колебаний её электрического поля. Дифракция — другое явление: волны от разных участков отверстия или решётки накладываются и перераспределяют свет по направлениям.", "Light is a transverse electromagnetic wave. Polarisation describes the orientation of its electric field oscillations. Diffraction is different: waves from different parts of an aperture or grating superpose and redistribute light among directions.", "Жарық — көлденең электромагниттік толқын. Поляризация оның электр өрісі тербелістерінің бағдарын сипаттайды. Дифракция өзгеше: саңылау не тор бөліктерінен тараған толқындар қабаттасып, жарықты бағыттар бойынша қайта бөледі."]],
  ["relativity rest matter", ["В специальной теории относительности скорость света в вакууме одинакова для всех инерциальных наблюдателей. Масса покоя соответствует энергии покоя даже у неподвижного тела. Кинетическая энергия — добавка к этой энергии, связанная с движением относительно наблюдателя.", "In special relativity the vacuum speed of light is the same for all inertial observers. Rest mass corresponds to rest energy even for a body at rest. Kinetic energy is the additional energy of motion relative to the observer.", "Арнайы салыстырмалылық теориясында вакуумдағы жарық жылдамдығы барлық инерциялық бақылаушыларға бірдей. Тыныштық массасына қозғалмайтын денеде де тыныштық энергиясы сәйкес келеді. Кинетикалық энергия — бақылаушыға қатысты қозғалыспен байланысты қосымша энергия."]],
  ["nano", ["Нанометр — миллиардная доля метра. При уменьшении частицы её объём убывает быстрее площади поверхности. Поэтому доля атомов у поверхности растёт, и свойства маленьких частиц могут отличаться от свойств массивного образца того же вещества.", "A nanometre is a billionth of a metre. As a particle shrinks its volume falls faster than its surface area. A greater fraction of atoms lies near the surface, so small particles can differ from bulk samples of the same substance.", "Нанометр — метрдің миллиардтан бір бөлігі. Бөлшек кішірейгенде көлемі бет ауданынан жылдам кемиді. Бет маңындағы атомдар үлесі өсіп, ұсақ бөлшектер қасиеті сол заттың ірі үлгісінен өзгеше болуы мүмкін."]],
  ["sun galaxy hubble universe", ["Галактика — связанная тяготением система звёзд, газа, пыли и тёмной материи. Расстояние между далёкими галактиками меняется с расширением Вселенной. Расширение проявляется на больших масштабах и не означает, что отдельная планета или атом тоже растут в размерах.", "A galaxy is a gravitationally bound system of stars, gas, dust and dark matter. The separation of distant galaxies changes as the universe expands. This large-scale expansion does not mean individual planets or atoms grow in size.", "Галактика — жұлдыздар, газ, шаң және қараңғы материя тартылыспен байланысқан жүйе. Ғалам кеңейгенде алыс галактикалар аралығы өзгереді. Ірі ауқымды кеңею жеке планета не атом да ұлғаяды деген сөз емес."]]
];
const lessonExplanations = [
  ["utube", ["Сообщающиеся сосуды соединены так, что жидкость может перетекать между ними. При одинаковом наружном давлении одна и та же жидкость устанавливается на одном уровне; иначе избыточное давление вызвало бы течение.", "Communicating vessels let liquid flow between them. With equal external pressure the same liquid settles at equal heights; a pressure imbalance would otherwise drive flow.", "Қатынас ыдыстарда сұйық бірінен екіншісіне өте алады. Сыртқы қысым бірдей болса, біртекті сұйық деңгейлері теңеседі, әйтпесе қысым айырмасы ағыс туғызар еді."]],
  ["air manometer", ["Барометр измеряет атмосферное давление, манометр сравнивает давления. В U-образной трубке разность высот показывает именно разность давлений. Чтобы получить абсолютное давление газа, учитывают давление на другой конец трубки.", "A barometer measures atmospheric pressure; a manometer compares pressures. The height difference in a U-tube indicates a pressure difference. To obtain absolute gas pressure include the pressure at the other end.", "Барометр атмосфералық қысымды, манометр қысым айырмасын өлшейді. U-түтіктегі деңгей айырмасы абсолют қысым емес. Газдың абсолют қысымын табуға екінші ұштағы қысым қажет."]],
  ["press", ["Гидравлический пресс передаёт давление жидкости от малого поршня к большому. Большая площадь даёт большую силу при том же давлении. Выигрыш в силе оплачивается движением малого поршня на большее расстояние.", "A hydraulic press transfers pressure from a small piston to a large one. Equal pressure produces greater force on the larger area, at the cost of greater travel of the small piston.", "Гидравликалық пресс қысымды кіші поршеньнен үлкеніне береді. Бірдей қысымда үлкен ауданда күш үлкен, есесіне кіші поршень ұзағырақ жол жүреді."]],
  ["model", ["Показание прибора само по себе не объясняет явление. Эхолот измеряет время до возвращения отражённого звука; расстояние получают, учитывая скорость звука и двойной путь. Так наблюдаемая величина превращается в знание о недоступном объекте.", "An instrument reading alone is not an explanation. Sonar measures the delay of a returning sound; distance follows from sound speed and the two-way path. A measurement thus reveals an otherwise inaccessible object.", "Аспап көрсеткіші өздігінен түсіндірме емес. Эхолот дыбыстың қайту уақытын өлшейді; дыбыс жылдамдығы мен қос жол арқылы қашықтық табылады. Өлшем көзге көрінбейтін нысанды зерттеуге мүмкіндік береді."]],
  ["kepler", ["Орбита планеты в задаче двух тел — эллипс с Солнцем в одном из фокусов. Ближе к Солнцу планета за то же время проходит более длинную дугу. Для сравнения периодов берут большую полуось эллипса, а не мгновенное расстояние.", "In the two-body model a planet follows an ellipse with the Sun at one focus. Near the Sun it covers a longer arc in equal time. Use the semimajor axis, not instantaneous distance, when comparing periods.", "Екі дене моделінде планета эллипспен қозғалып, Күн бір фокуста жатады. Күнге жақын жерде бірдей уақытта ұзағырақ доға өтеді. Периодтарды салыстыруға ағымдағы қашықтық емес, үлкен жарты ось алынады."]],
  ["resonance rlc", ["Резонанс — усиленный отклик системы на периодическое воздействие вблизи собственной частоты. На качелях небольшие толчки в нужной фазе добавляют энергию раз за разом. Потери ограничивают установившуюся амплитуду.", "Resonance is a strong response to periodic forcing near a natural frequency. Well-timed pushes add energy to a swing each cycle. Losses limit the steady amplitude.", "Резонанс — меншікті жиілік маңындағы периодты әсерге жүйенің күшейген жауабы. Дер кезінде итеру әткеншекке әр циклде энергия қосады. Шығындар орныққан амплитуданы шектейді."]],
  ["humidity", ["Относительная влажность сравнивает парциальное давление водяного пара с давлением насыщения при той же температуре. Даже без добавления пара охлаждение может довести воздух до точки росы: давление насыщения при охлаждении уменьшается.", "Relative humidity compares water vapour pressure to saturation pressure at the same temperature. Cooling without adding vapour can reach the dew point because saturation pressure falls.", "Салыстырмалы ылғалдылық су буының парциал қысымын сол температурадағы қаныққан бу қысымымен салыстырады. Бу қоспай салқындатса да шық нүктесіне жетуге болады, себебі қанығу қысымы кемиді."]],
  ["capillary", ["Поверхностное натяжение возникает потому, что создание новой поверхности жидкости требует энергии. В узкой трубке взаимодействие со стенкой изгибает поверхность. При хорошем смачивании жидкость поднимается, пока вес столба не уравновесит действие поверхностного натяжения.", "Surface tension reflects the energy cost of creating liquid surface. The wall curves the surface in a narrow tube. For a wetting liquid the column rises until its weight balances the surface-tension force.", "Беттік керілу жаңа сұйық бетін жасауға энергия қажет болуымен байланысты. Жіңішке түтікте қабырға сұйық бетін иеді. Жұғатын сұйық баған салмағы беттік керілу күшін теңестіргенше көтеріледі."]],
  ["stateeq isotherm", ["Идеальный газ — модель, в которой собственным объёмом молекул и их дальним взаимодействием пренебрегают. Состояние порции газа описывают давлением, объёмом и абсолютной температурой. При изотермическом сжатии температура постоянна, а более частые удары молекул о стенки повышают давление.", "An ideal gas neglects molecular volume and long-range interactions. Pressure, volume and absolute temperature describe a given sample. Isothermal compression keeps temperature fixed but increases wall impacts and pressure.", "Идеал газ моделінде молекулалардың көлемі мен алыс әсерлесуі еленбейді. Газ күйін қысым, көлем және абсолют температура сипаттайды. Изотермиялық сығуда температура тұрақты, қабырғаға соққылар жиілеп қысым өседі."]],
  ["field fluxE", ["Силовые линии показывают направление поля. Поток поля через поверхность учитывает только составляющую, перпендикулярную этой поверхности. В замкнутой поверхности входящие и выходящие вклады могут компенсироваться даже там, где поле не равно нулю.", "Field lines show direction. Flux through a surface counts only the normal component. On a closed surface incoming and outgoing contributions can cancel even when the local field is not zero.", "Күш сызықтары өріс бағытын көрсетеді. Бет арқылы өтетін ағын өрістің тек нормаль құраушысын ескереді. Тұйық бетке кіретін және шығатын ағындар жергілікті өріс нөл болмаса да өтеле алады."]],
  ["shield", ["В проводнике свободные заряды перераспределяются до исчезновения поля внутри проводящего материала при электростатическом равновесии. В диэлектрике связанные положительные и отрицательные заряды немного смещаются относительно друг друга. Это поляризация, а не перенос свободного заряда через весь образец.", "Free charges in a conductor rearrange until the internal field in the conducting material vanishes at electrostatic equilibrium. In a dielectric bound charges shift slightly relative to one another. This is polarisation, not free charge crossing the sample.", "Өткізгіште еркін зарядтар электростатикалық тепе-теңдікте ішкі өріс нөл болғанша таралады. Диэлектрикте байланысқан оң және теріс зарядтар өзара сәл ығысады. Бұл поляризация, бүкіл үлгімен еркін заряд тасымалы емес."]],
  ["capacitor capenergy", ["Конденсатор — два проводника, разделённые изолятором. На обкладках накапливаются противоположные заряды. Электроёмкость показывает, какой заряд соответствует единице напряжения. При зарядке приходится совершать работу против растущей разности потенциалов; эта работа запасается в поле.", "A capacitor has two conductors separated by an insulator. Its plates store opposite charges. Capacitance relates stored charge to voltage. Charging requires work against a growing potential difference; the field stores this energy.", "Конденсатор — оқшаулағышпен бөлінген екі өткізгіш. Астарларда қарама-қарсы заряд жиналады. Сыйымдылық бірлік кернеуге келетін зарядты көрсетеді. Зарядтау кезінде артып жатқан потенциалдар айырымына қарсы жасалған жұмыс өрісте сақталады."]],
  ["ohm wire metal fuse", ["Сопротивление связывает падение напряжения с током. У более длинной металлической проволоки того же сечения сопротивление больше, у более толстой той же длины — меньше. Нагрев меняет свойства материала, поэтому отношение напряжения к току не всегда постоянно.", "Resistance relates voltage drop to current. A longer metal wire of the same cross section has greater resistance; a thicker one of equal length has less. Heating changes the material, so voltage divided by current need not stay constant.", "Кедергі кернеу түсуі мен токты байланыстырады. Қимасы бірдей ұзын сымның кедергісі үлкен, ұзындығы бірдей жуан сымдікі аз. Қызғанда материал қасиеті өзгереді, сондықтан кернеудің токқа қатынасы әрқашан тұрақты емес."]],
  ["parallel kirch", ["Узел цепи — соединение ветвей. В установившемся режиме в нём не накапливается заряд, поэтому сумма входящих токов равна сумме выходящих. В параллельных ветвях одинаково напряжение между общими узлами, но токи могут быть разными.", "A node connects branches. In steady operation it does not accumulate charge: entering and leaving currents balance. Parallel branches share voltage between common nodes but need not carry equal currents.", "Түйін тармақтарды қосады. Тұрақталған режимде заряд жиналмайды, кіретін және шығатын токтар теңгеріледі. Параллель тармақтардың ортақ түйіндеріндегі кернеу бірдей, токтары әртүрлі болуы мүмкін."]],
  ["power joule", ["Мощность — скорость передачи энергии. В резисторе работа электрического поля переходит во внутреннюю энергию: проводник нагревается. При том же сопротивлении удвоение тока увеличивает тепловую мощность в четыре раза, а не в два.", "Power is the rate of energy transfer. In a resistor electrical work becomes internal energy. At the same resistance doubling current quadruples heating power rather than doubling it.", "Қуат — энергия беру шапшаңдығы. Резисторда электр өрісінің жұмысы ішкі энергияға өтеді. Кедергі тұрақты болса, ток екі еселенгенде қыздыру қуаты екі емес, төрт есе өседі."]],
  ["emf full", ["ЭДС характеризует работу сторонних сил источника на единицу заряда. Внутреннее сопротивление означает, что часть энергии рассеивается в самом источнике. При отдаче тока напряжение на клеммах поэтому меньше ЭДС.", "EMF is the work per charge by non-electrostatic forces inside a source. Internal resistance dissipates some energy in the source itself. When it delivers current its terminal voltage is consequently below its emf.", "ЭҚК — көздің бөгде күштерінің бірлік зарядқа жасайтын жұмысы. Ішкі кедергіден энергияның бір бөлігі көздің өзінде бөлінеді. Ток бергенде қысқыштардағы кернеу осы себепті ЭҚК-ден төмен."]],
  ["inductance", ["Самоиндукция возникает, когда изменение тока катушки меняет её собственный магнитный поток. ЭДС препятствует изменению тока: после включения он нарастает постепенно. Индуктивность характеризует эту связь и способность катушки запасать магнитную энергию.", "Self-induction occurs when a changing coil current changes its own magnetic flux. The induced emf resists current change, so current rises gradually after switching on. Inductance describes this link and magnetic energy storage.", "Өздік индукция шарғы тогы өзгеріп, өз магнит ағынын өзгерткенде туады. ЭҚК ток өзгерісіне кедергі жасайды, қосылғанда ток біртіндеп өседі. Индуктивтік осы байланыс пен магнит энергиясын жинауды сипаттайды."]],
  ["transform", ["Трансформатор связывает обмотки переменным магнитным потоком. На обмотке с большим числом витков возникает большая ЭДС. При передаче одной и той же мощности повышенное напряжение позволяет уменьшить ток в линии и нагрев проводов.", "A transformer couples windings by changing flux. More turns give a larger emf. Transmitting the same power at higher voltage reduces line current and resistive heating.", "Трансформатор орамдарды айнымалы магнит ағынымен байланыстырады. Орамы көп жақта ЭҚК жоғары. Бірдей қуатты жоғары кернеумен беру желідегі ток пен сым қызуын азайтады."]],
  ["react impedance rms acpower", ["Действующее значение переменного тока даёт тот же нагрев резистора, что и равный ему постоянный ток. В катушке и конденсаторе энергия может возвращаться источнику. Поэтому при сдвиге фаз простое произведение действующих значений тока и напряжения ещё не равно средней активной мощности.", "RMS current gives the same resistor heating as an equal steady current. Inductors and capacitors can return energy to the source. With a phase shift the product of RMS voltage and current alone is not average active power.", "Айнымалы токтың әсерлік мәні резисторды сондай тұрақты токтай қыздырады. Шарғы мен конденсатор энергияны көзге қайтара алады. Фазалық ығысу барда әсерлік ток пен кернеу көбейтіндісі орташа актив қуатқа тең емес."]],
  ["echo stand interf", ["Отражённая волна приходит с задержкой. Если задержку звука можно различить на слух, возникает эхо. При наложении когерентных волн результат зависит от разности фаз; встречные волны равной амплитуды и частоты могут образовать стоячую волну с неподвижными узлами.", "A reflected wave returns after a delay. A separately heard sound reflection is an echo. Coherent waves superpose according to phase difference; equal counterpropagating waves can form a standing wave with fixed nodes.", "Шағылған толқын кешігіп келеді. Шағылған дыбыс бөлек естілсе, жаңғырық пайда болады. Когерентті толқындар фазалар айырымына қарай қосылады; тең қарсы толқындар қозғалмайтын түйіндері бар тұрғын толқын түзе алады."]],
  ["radio signals", ["В радиосвязи сигнал изменяет параметры высокочастотной несущей. При амплитудной модуляции меняется амплитуда несущего колебания, а в приёмнике детектор выделяет исходное изменение. В оптоволокне информацию переносит свет, удерживаемый внутри сердцевины.", "Radio encodes information by varying a high-frequency carrier. Amplitude modulation changes its amplitude; the receiver detector recovers the original variation. Optical fibres carry information in light confined to the core.", "Радиобайланыста ақпарат жоғары жиілікті тасымалдаушының параметрін өзгертеді. Амплитудалық модуляция амплитуданы өзгертеді, детектор бастапқы сигналды бөліп алады. Оптоталшықта ақпаратты өзекшеде таралатын жарық тасиды."]],
  ["thermal spectra", ["Спектр показывает распределение излучения по частотам или длинам волн. Горячее плотное тело обычно даёт широкий непрерывный спектр. Разреженный возбуждённый атомарный газ испускает отдельные линии: каждой отвечает разность двух разрешённых энергий атома.", "A spectrum shows how radiation is distributed over frequency or wavelength. A hot dense body typically yields a broad continuous spectrum. A dilute excited atomic gas emits lines corresponding to differences between allowed atomic energies.", "Спектр сәуленің жиілік не толқын ұзындығы бойынша таралуын көрсетеді. Ыстық тығыз дене кең тұтас спектр береді. Сиретілген қозған атомдық газдың әр сызығы атомның рұқсат етілген екі энергиясының айырмасына сәйкес келеді."]],
  ["photo lightp", ["Внешний фотоэффект — выход электронов с освещённой поверхности. Для освобождения электрона нужна работа выхода. В однофотонном процессе эту энергию должен предоставить один фотон; увеличение яркости не заменяет недостаточную частоту.", "The external photoelectric effect emits electrons from an illuminated surface. Releasing an electron requires the work function. In a single-photon process one photon must supply that energy; increasing brightness cannot replace insufficient frequency.", "Сыртқы фотоэффект — жарық түскен беттен электрондардың шығуы. Электронды босатуға шығу жұмысы керек. Бірфотондық процесте энергияны бір фотон береді; жиілік жеткіліксіз болса, жарықтықты арттыру оны алмастырмайды."]],
  ["xray ximage", ["Рентгеновское излучение — коротковолновое электромагнитное излучение. Разные ткани ослабляют пучок по-разному, и детектор регистрирует различие интенсивностей. В компьютерной томографии из множества проекций, снятых под разными углами, восстанавливают сечение тела.", "X-rays are short-wavelength electromagnetic radiation. Tissues attenuate the beam differently and a detector records intensity differences. CT reconstructs a body slice from many projections taken at different angles.", "Рентген сәулесі — қысқа толқынды электромагниттік сәуле. Ұлпалар шоқты әртүрлі әлсіретеді, детектор қарқын айырмасын тіркейді. Компьютерлік томография түрлі бұрыштан алынған проекциялардан дене қимасын құрады."]],
  ["decay dose", ["Радиоактивность — самопроизвольное превращение неустойчивого ядра. Период полураспада относится к большой совокупности ядер, а не к «сроку жизни» одного атома. Активность считает распады за секунду, поглощённая доза — переданную веществу энергию на единицу массы.", "Radioactivity is spontaneous transformation of an unstable nucleus. Half-life concerns a large population, not an individual atom’s deadline. Activity counts decays per second; absorbed dose measures energy deposited per unit mass.", "Радиоактивтілік — тұрақсыз ядроның өздігінен түрленуі. Жартылай ыдырау периоды жеке атомның мерзіміне емес, көп ядроға қатысты. Активтілік секундтағы ыдырауды, жұтылған доза бірлік массаға берілген энергияны сипаттайды."]],
  ["rutherford bohr", ["В опыте с тонкой фольгой большинство альфа-частиц проходило почти прямо. Редкие большие отклонения требовали объяснить очень сильное отталкивание на малом расстоянии. Так распределение попаданий стало свидетельством компактного положительно заряженного ядра.", "Most alpha particles crossed thin foil nearly straight. Rare large deflections implied very strong repulsion at short range. The hit distribution thus provided evidence for a compact positive nucleus.", "Жұқа фольгадан альфа-бөлшектердің көбі түзу өтті. Сирек үлкен ауытқу өте қысқа аралықтағы күшті тебілуді түсіндіруді талап етті. Соққылардың таралуы шағын оң ядроның дәлелі болды."]],
  ["fission fusion reactor", ["Деление расщепляет тяжёлое ядро, синтез соединяет лёгкие ядра. При энергетически выгодном превращении суммарная масса покоя продуктов меньше исходной: разность проявляется как энергия движения и излучения. На электростанции тепло затем превращается в механическую и электрическую энергию.", "Fission splits a heavy nucleus; fusion combines light nuclei. An energy-releasing change leaves products with less total rest mass; the difference appears as motion and radiation. A power station subsequently converts heat into mechanical and electrical energy.", "Бөлінуде ауыр ядро ажырайды, синтезде жеңіл ядролар қосылады. Энергия бөлінгенде өнімдердің тыныштық массасы аз, айырма қозғалыс пен сәулеге өтеді. Электр станциясында жылу кейін механикалық және электр энергиясына айналады."]],
  ["laser matter dual", ["Для описания микромира одной классической картины недостаточно. Интерференция выявляет волновые свойства, а обмен энергией при отдельных событиях — квантовый характер. Для частиц вещества длина волны де Бройля уменьшается при увеличении импульса.", "One classical picture cannot describe the microscopic world. Interference reveals wave properties while individual energy exchanges show quantisation. For matter the de Broglie wavelength decreases as momentum increases.", "Микроәлемді бір классикалық бейнемен сипаттау жеткіліксіз. Интерференция толқындық қасиетті, жеке энергия алмасу кванттық сипатты көрсетеді. Зат бөлшегінің де Бройль толқын ұзындығы импульс артқанда кемиді."]],
  ["hubble", ["Красное смещение означает, что наблюдаемая спектральная линия смещена к большей длине волны по сравнению с лабораторной. Для близких по космологическим меркам галактик скорость удаления приблизительно пропорциональна расстоянию. Отдельные галактики имеют также собственные скорости.", "Redshift moves an observed spectral line to a longer wavelength than its laboratory value. For cosmologically nearby galaxies recession speed is approximately proportional to distance. Individual galaxies also have peculiar velocities.", "Қызыл ығысуда бақыланған спектр сызығы зертханадағыдан ұзынырақ толқынға ауысады. Ғарыштық өлшемде жақын галактикалардың алыстау жылдамдығы қашықтыққа жуық пропорционал. Жеке галактикалардың меншікті жылдамдығы да бар."]]
];
const lessonHistory = [
  ["nature method acc accdist fall", ["В 1638 году Галилей опубликовал «Беседы и математические доказательства, касающиеся двух новых отраслей науки». Наклонная плоскость позволяла замедлить движение шара настолько, чтобы сравнивать пути и времена: опыт связывал наблюдение с математической закономерностью.", "In 1638 Galileo published his Discourses on Two New Sciences. An inclined plane slowed a rolling ball enough to compare distances and times, linking observation to a mathematical pattern.", "1638 жылы Галилей екі жаңа ғылым туралы еңбегін жариялады. Көлбеу жазықтық шар қозғалысын баяулатып, жол мен уақытты салыстыруға мүмкіндік берді: бақылау математикалық заңдылықпен байланыстырылды."]],
  ["si error mass", ["В 1960 году XI Генеральная конференция по мерам и весам приняла название «Международная система единиц». Общие единицы позволяют сравнить результаты двух лабораторий, а не только показания одного прибора.", "In 1960 the 11th General Conference on Weights and Measures adopted the name International System of Units. Shared units allow results from different laboratories, not just readings on one instrument, to be compared.", "1960 жылы Өлшемдер мен салмақтар жөніндегі XI Бас конференция Халықаралық бірліктер жүйесі атауын қабылдады. Ортақ бірліктер әртүрлі зертханалардың нәтижелерін салыстыруға мүмкіндік береді."]],
  ["air hydro manometer", ["В 1643 году Эванджелиста Торричелли использовал столб ртути для исследования атмосферного давления. Ртуть в перевёрнутой трубке удерживала не пустота сверху, а давление воздуха на открытую поверхность ртути в сосуде.", "In 1643 Evangelista Torricelli used a mercury column to investigate air pressure. The vacuum above did not hold the column up; air pressed on the exposed mercury in the dish.", "1643 жылы Эванджелиста Торричелли ауа қысымын сынап бағанымен зерттеді. Бағанды жоғарыдағы бос кеңістік емес, ыдыстағы ашық сынап бетіне әсер еткен ауа қысымы ұстап тұрды."]],
  ["inertia newton grav orbit", ["В «Математических началах натуральной философии» 1687 года Ньютон изложил законы движения и всемирного тяготения. Один подход позволил объяснять и падение предмета у поверхности Земли, и непрерывное отклонение Луны от прямолинейного пути.", "Newton’s Principia of 1687 set out laws of motion and universal gravitation. The same approach accounted for a falling object near Earth and the Moon’s continual departure from a straight path.", "Ньютон 1687 жылғы «Натурал философияның математикалық бастамаларында» қозғалыс пен бүкіләлемдік тартылыс заңдарын баяндады. Бір тәсіл Жердегі дененің құлауын да, Айдың түзу жолдан үздіксіз ауытқуын да түсіндірді."]],
  ["diff mkt", ["В 1827 году Роберт Броун наблюдал беспорядочное движение мелких частиц в жидкости. Это было наблюдение, а не наблюдение самих молекул. В 1905 году Альберт Эйнштейн связал измеряемое смещение частиц с молекулярным движением количественной теорией.", "In 1827 Robert Brown observed erratic motion of small particles in liquid, not the molecules themselves. In 1905 Albert Einstein developed a quantitative theory connecting measurable particle displacements with molecular motion.", "1827 жылы Роберт Броун сұйықтағы ұсақ бөлшектердің ретсіз қозғалысын байқады, молекулалардың өзін емес. 1905 жылы Альберт Эйнштейн өлшенетін ығысуды молекулалық қозғалыспен байланыстыратын сандық теория ұсынды."]],
  ["coil magnet core", ["В 1820 году Ханс Кристиан Эрстед сообщил об отклонении магнитной стрелки возле провода с током. Смена направления тока меняла отклонение: наблюдение показало связь электричества и магнетизма.", "In 1820 Hans Christian Ørsted reported that electric current in a nearby wire deflected a compass needle. Reversal of the current reversed the deflection, revealing a link between electricity and magnetism.", "1820 жылы Ханс Кристиан Эрстед ток жүретін сым маңындағы магнит тілшесінің бұрылуын сипаттады. Ток кері бағытталғанда ауытқу да өзгеріп, электр мен магнетизм байланысын көрсетті."]],
  ["induce generator lenz transform", ["В 1831 году Майкл Фарадей обнаружил электромагнитную индукцию. При включении тока в одной обмотке прибор во второй отклонялся кратковременно: решающим оказалось изменение магнитного потока, а не просто наличие магнита.", "In 1831 Michael Faraday discovered electromagnetic induction. Switching on current in one winding briefly deflected the detector in another: a changing flux mattered, not merely the presence of a magnet.", "1831 жылы Майкл Фарадей электромагниттік индукцияны ашты. Бір орамдағы токты қосқанда екінші орамдағы аспап қысқа уақыт ауытқыды: магниттің бар болуы емес, ағынның өзгеруі маңызды болды."]],
  ["kepler solar", ["В 1609 году Иоганн Кеплер опубликовал первые два закона движения планет. При анализе наблюдений Марса, выполненных Тихо Браге, эллиптическая орбита оказалась точнее привычной окружности.", "In 1609 Johannes Kepler published his first two laws of planetary motion. Analysis of Tycho Brahe’s observations of Mars favoured an elliptical orbit over the familiar circle.", "1609 жылы Иоганн Кеплер планеталар қозғалысының алғашқы екі заңын жариялады. Тихо Брагенің Марс бақылаулары шеңберге қарағанда эллипстік орбитамен дәлірек сипатталды."]],
  ["xray ximage", ["В 1895 году Вильгельм Рентген обнаружил излучение, проходившее через некоторые непрозрачные для видимого света материалы. Контраст костей и мягких тканей объясняется различием ослабления пучка, а не свечением самих костей.", "In 1895 Wilhelm Röntgen discovered radiation that passed through some materials opaque to visible light. Bone and soft tissue contrast comes from differences in attenuation, not the bones glowing.", "1895 жылы Вильгельм Рентген көрінетін жарық өтпейтін кейбір заттардан өтетін сәуле ашты. Сүйек пен жұмсақ ұлпа арасындағы айырма сүйектің жарқырауынан емес, шоқтың әрқалай әлсіреуінен туады."]],
  ["rutherford bohr", ["В опытах Ганса Гейгера и Эрнеста Марсдена 1909 года некоторые альфа-частицы сильно отклонялись в металлической фольге. В 1911 году Эрнест Резерфорд предложил ядерную модель, объясняющую результат. Наблюдение рассеяния и вывод о строении атома — два разных шага.", "In 1909 Hans Geiger and Ernest Marsden observed large deflections of some alpha particles in metal foil. In 1911 Ernest Rutherford proposed the nuclear model to explain them. Observing scattering and inferring atomic structure were distinct steps.", "1909 жылы Ханс Гейгер мен Эрнест Марсден металл фольгада кейбір альфа-бөлшектердің қатты ауытқуын байқады. 1911 жылы Эрнест Резерфорд оны түсіндіретін ядролық модель ұсынды. Шашырауды бақылау мен атом құрылысын қорытындылау — екі бөлек қадам."]],
  ["photo thermal", ["В 1900 году Макс Планк ввёл кванты энергии при описании теплового излучения. В 1905 году Эйнштейн применил идею порций энергии самого света к фотоэффекту: энергия одного такого кванта зависит от частоты.", "In 1900 Max Planck introduced energy quanta in describing thermal radiation. In 1905 Einstein applied the idea of quanta of light itself to the photoelectric effect: the energy of each quantum depends on frequency.", "1900 жылы Макс Планк жылулық сәулені сипаттауда энергия кванттарын енгізді. 1905 жылы Эйнштейн жарықтың өз кванттары туралы ойды фотоэффектке қолданды: бір квант энергиясы жиілікке тәуелді."]],
  ["laser", ["В 1960 году Теодор Майман продемонстрировал первый работающий лазер на кристалле рубина. Усиление создаёт вынужденное излучение: атом отдаёт энергию световой волне согласованно с возбуждающим светом.", "In 1960 Theodore Maiman demonstrated the first working laser using a ruby crystal. Stimulated emission amplifies light: an atom contributes to the wave coherently with the stimulating light.", "1960 жылы Теодор Майман рубин кристалындағы алғашқы жұмыс істейтін лазерді көрсетті. Мәжбүрлі сәуле жарықты күшейтеді: атом қоздырушы жарықпен үйлесімді толқынға энергия береді."]],
  ["parallax", ["В 1838 году Фридрих Бессель опубликовал измерение годичного параллакса звезды 61 Лебедя. Сравнение положений звезды в разные сезоны превратило орбиту Земли в измерительную базу.", "In 1838 Friedrich Bessel published a measurement of the annual parallax of 61 Cygni. Comparing stellar positions in different seasons turned Earth’s orbit into a measuring baseline.", "1838 жылы Фридрих Бессель Аққу шоқжұлдызындағы 61 жұлдызының жылдық параллаксын өлшеуін жариялады. Әртүрлі маусымдағы орындарды салыстыру Жер орбитасын өлшеу базасына айналдырды."]]
];

const paragraphTheory = {
  "7.5": ["Абсолютную погрешность записывают в единицах измеряемой величины. Например, длина 20,0 ± 0,1 см означает интервал от 19,9 до 20,1 см. Относительная погрешность сравнивает ширину допуска в одну сторону с самим результатом: здесь это 0,1 из 20,0, то есть 0,5 %.", "Absolute uncertainty has the same unit as the measurement. A length of 20.0 ± 0.1 cm gives an interval from 19.9 to 20.1 cm. Relative uncertainty compares the one-sided margin with the value: 0.1 out of 20.0, or 0.5%.", "Абсолют қате өлшенген шаманың бірлігімен жазылады. 20,0 ± 0,1 см ұзындық 19,9–20,1 см аралығын білдіреді. Салыстырмалы қате бір жақтағы ауытқуды нәтижемен салыстырады: 20,0-дің 0,1 бөлігі, яғни 0,5 %."],
  "7.12": ["Объём прямоугольного бруска находят по трём размерам. Для камня сложной формы удобнее мензурка: полностью погружённый камень вытесняет объём воды, равный собственному объёму. Поэтому вычитают начальное показание из конечного, а не складывают их.", "The volume of a rectangular block follows from its three dimensions. For an irregular stone use a measuring cylinder: a fully submerged stone displaces its own volume of water. Subtract the initial reading from the final one rather than adding them.", "Тікбұрышты білеуше көлемі үш өлшемінен табылады. Пішіні күрделі тасты мензуркаға толық батырса, өз көлеміндей суды ығыстырады. Сондықтан соңғы көрсеткіштен бастапқыны азайтады, оларды қоспайды."],
  "7.37": ["Лунное затмение происходит, когда Земля оказывается между Солнцем и Луной и Луна входит в земную тень. При солнечном затмении порядок другой: Луна закрывает Солнце для наблюдателя на Земле. Это разные положения трёх тел, а не изменение яркости Солнца.", "A lunar eclipse occurs when Earth lies between the Sun and Moon and the Moon enters Earth's shadow. In a solar eclipse the Moon obscures the Sun for an observer on Earth. The geometry changes, not the Sun's luminosity.", "Ай тұтылғанда Жер Күн мен Айдың арасына келіп, Ай Жер көлеңкесіне енеді. Күн тұтылғанда Ай Жердегі бақылаушыға Күнді жабады. Өзгеретін нәрсе — Күн жарықтылығы емес, үш дененің орналасуы."],
  "7.38": ["Метеороид — небольшое тело, движущееся в космосе. Метеор — световое явление в атмосфере, а метеорит — фрагмент, достигший поверхности. Слово «падающая звезда» описывает вид полосы света, но не природу объекта.", "A meteoroid is a small body in space. A meteor is a luminous atmospheric phenomenon; a meteorite is a fragment reaching the surface. A “shooting star” describes its appearance, not its nature.", "Метеороид — ғарыштағы шағын дене. Метеор — атмосферадағы жарық құбылысы, метеорит — бетке жеткен қалдық. «Аққан жұлдыз» жарық іздің көрінісін ғана сипаттайды."],
  "8.6": ["При испарении молекулы покидают поверхность жидкости. На это нужна энергия. Если пот на коже именно испаряется, а не просто стекает, часть энергии поступает от тела и кожа охлаждается. Во влажном воздухе испарение идёт медленнее.", "Evaporation lets molecules escape the liquid surface and requires energy. When sweat evaporates rather than dripping off, some energy comes from the body and the skin cools. Humid air slows evaporation.", "Буланғанда молекулалар сұйық бетінен кетеді, бұған энергия қажет. Тер ағып кетпей, теріде буланса, энергияның бір бөлігін денеден алып салқындатады. Ылғалды ауада булану баяулайды."],
  "8.16": ["КПД теплового двигателя — доля полученной от нагревателя энергии, превратившаяся за цикл в полезную работу. Если из каждых ста джоулей тридцать превратились в работу, остальные семьдесят переданы холодильнику. Проценты считают от полученной теплоты, а не от потерь.", "Engine efficiency is the fraction of heat received that becomes useful cycle work. If thirty of every hundred joules become work, seventy are rejected. Percent efficiency uses the heat input, not the losses, as denominator.", "Жылу қозғалтқышының ПӘК-і — алынған жылудың циклде пайдалы жұмысқа айналған үлесі. Жүз джоульден отызы жұмыс болса, жетпісі салқындатқышқа берілді. Пайыз шығыннан емес, кіріс жылудан есептеледі."],
  "8.17": ["Тепловой насос переносит энергию из более холодной среды в более тёплую за счёт внешней работы. Дом получает и отобранную у грунта теплоту, и затраченную работу. Отношение отданной теплоты к работе поэтому может превышать единицу, не нарушая сохранения энергии.", "A heat pump uses work to move energy from a colder region to a warmer one. The house receives both the extracted ground heat and the work input. Heat delivered divided by work can exceed one without violating energy conservation.", "Жылу сорғысы сыртқы жұмыс арқылы энергияны салқын ортадан жылы ортаға береді. Үй топырақтан алынған жылуды да, жұмсалған жұмысты да алады. Сондықтан жылудың жұмысқа қатынасы энергия сақталуын бұзбай бірден асады."],
  "8.29": ["В обычном металле при нагреве усиливаются колебания решётки и растёт сопротивление. Сверхпроводимость — иной режим некоторых материалов: ниже критической температуры их электрическое сопротивление постоянному току исчезает при подходящих поле и токе. Это не просто очень хорошая проводимость.", "Heating an ordinary metal increases lattice vibrations and resistance. Superconductivity is a different state of certain materials: below a critical temperature their DC resistance vanishes for suitable current and field. It is not just very good conductivity.", "Кәдімгі металды қыздырғанда тор тербелістері мен кедергі артады. Асқынөткізгіштік — кейбір заттардың басқа күйі: критикалық температурадан төмен, тиісті ток пен өрісте тұрақты ток кедергісі жоғалады. Бұл жай ғана жақсы өткізгіштік емес."],
  "8.32": ["Постоянный магнит сохраняет намагниченность без внешнего тока. У него есть северный и южный полюсы. Если разделить магнит, каждая часть сама станет магнитом с двумя полюсами: разрез не отделяет север от юга.", "A permanent magnet retains magnetisation without an external current. It has north and south poles. Cutting it produces pieces each with both poles; the cut does not isolate north from south.", "Тұрақты магнит сыртқы токсыз магниттелуін сақтайды. Оның солтүстік және оңтүстік полюстері бар. Магнитті бөлгенде әр бөлік екі полюсті болады, кесу полюстерді бір-бірінен оқшауламайды."],
  "8.42": ["Близорукость означает, что в расслабленном глазу параллельные лучи от далёкого предмета сходятся перед сетчаткой. Рассеивающая линза немного разводит лучи до входа в глаз; после преломления фокус оказывается дальше, на сетчатке.", "In myopia a relaxed eye focuses parallel rays from a distant object in front of the retina. A diverging lens separates the rays slightly before entry, moving the final focus back to the retina.", "Миопияда босаңсыған көз алыс денеден келген параллель сәулелерді тор қабықтың алдында жинайды. Шашыратқыш линза сәулелерді көзге дейін сәл ажыратып, соңғы фокусты тор қабыққа жылжытады."],
  "9.6": ["Угловая скорость показывает, на какой угол поворачивается радиус за единицу времени. На вращающемся диске все точки имеют одну угловую скорость, но край проходит более длинную дугу. Поэтому линейная скорость возрастает с расстоянием до оси.", "Angular speed is the angle swept per unit time. Points on a rotating disk share angular speed, but its rim traces a longer arc. Linear speed therefore grows with distance from the axis.", "Бұрыштық жылдамдық радиустың бірлік уақытта бұрылу бұрышын көрсетеді. Айналған диск нүктелерінің бұрыштық жылдамдығы тең, жиегі ұзағырақ доға өтеді. Сондықтан сызықтық жылдамдық осьтен қашықтаған сайын артады."],
  "9.31": ["Электромагнитный спектр — непрерывный ряд частот от радиоволн до гамма-излучения. Видимый свет занимает узкую часть этого ряда. В вакууме все эти волны имеют одну скорость; различие цветов и диапазонов связано с частотой и длиной волны.", "The electromagnetic spectrum runs continuously from radio frequencies to gamma radiation. Visible light occupies a narrow part. In vacuum all these waves share a speed; colours and bands differ in frequency and wavelength.", "Электромагниттік спектр радиотолқыннан гамма-сәулеге дейінгі үздіксіз жиіліктер қатарын құрайды. Көрінетін жарық — оның тар бөлігі. Вакуумда жылдамдық бірдей, түс пен диапазон жиілік және толқын ұзындығымен ерекшеленеді."],
  "9.41": ["У частицы и её античастицы одинаковая масса, а электрические заряды противоположны, если частица заряжена. Позитрон, например, отличается от электрона знаком заряда. При их аннигиляции энергия и импульс не исчезают, а передаются продуктам превращения.", "A particle and its antiparticle have equal mass and, if charged, opposite electric charges. A positron differs from an electron by charge sign. Annihilation transfers energy and momentum to the products rather than destroying them.", "Бөлшек пен антибөлшектің массасы бірдей, зарядталған болса заряд таңбасы қарама-қарсы. Мысалы, позитрон электроннан заряд таңбасымен ерекшеленеді. Аннигиляцияда энергия мен импульс жоғалмай, өнімдерге беріледі."],
  "10.16": ["Вязкая жидкость тормозит движущийся в ней шарик. При очень медленном обтекании малого шара сила сопротивления пропорциональна скорости. Ускорение падающего шарика прекращается, когда тяжесть уравновешена суммой выталкивающей силы и сопротивления; скорость при этом не нулевая.", "A viscous fluid resists a moving sphere. In creeping flow around a small sphere drag is proportional to speed. A falling sphere stops accelerating when buoyancy and drag balance gravity; it need not stop moving.", "Тұтқыр сұйық қозғалған шарға кедергі жасайды. Шағын шарды өте баяу ағында кедергі жылдамдыққа пропорционал. Ауырлық күшін кері итеру мен кедергі теңестіргенде үдеу тоқтайды, жылдамдық нөл болмайды."],
  "10.24": ["Обратимый процесс можно обратить так, чтобы и система, и окружающие тела вернулись в исходные состояния. Реальное трение делает процесс необратимым. Энтропия помогает различать направление процессов: в изолированной системе она не убывает, хотя в отдельной её части может уменьшиться.", "A reversible process can restore both system and surroundings to their initial states. Real friction makes a process irreversible. Entropy helps identify allowed directions: it does not decrease in an isolated system, though it can fall in one part.", "Қайтымды процесте жүйе де, орта да бастапқы күйлеріне қайта алады. Нақты үйкеліс процесті қайтымсыз етеді. Энтропия бағытты ажыратады: оқшауланған жүйеде кемімейді, жеке бөлігінде кемуі мүмкін."],
  "10.43": ["Электролиз — химические превращения на электродах при прохождении тока через электролит. Количество выделившегося вещества зависит от прошедшего заряда, а не от времени самого по себе. При удвоении времени и уменьшении тока вдвое заряд не меняется.", "Electrolysis involves chemical changes at electrodes as current passes through an electrolyte. Deposited mass depends on charge passed, not time alone. Doubling time while halving current leaves charge unchanged.", "Электролиз — электролиттен ток өткенде электродтарда жүретін химиялық түрленулер. Бөлінген зат мөлшері тек уақытқа емес, өткен зарядқа тәуелді. Уақыт екі еселеніп ток екі есе кемісе, заряд өзгермейді."],
  "10.48": ["В ферромагнетике области согласованной ориентации магнитных моментов называют доменами. При нагреве тепловое движение нарушает магнитный порядок. Выше температуры Кюри самопроизвольная намагниченность исчезает; это не означает, что вещество вовсе перестаёт реагировать на поле.", "Domains are regions of aligned magnetic moments in a ferromagnet. Heating disrupts magnetic order. Above the Curie temperature spontaneous magnetisation disappears, but the material can still respond to an external field.", "Ферромагнетиктегі магниттік моменттері бағыттас аймақтар домендер деп аталады. Қызу магниттік реттілікті бұзады. Кюри температурасынан жоғарыда өздігінен магниттелу жоғалады, бірақ зат сыртқы өріске әлі жауап бере алады."],
  "11.17": ["В оптическом волокне сердцевина имеет больший показатель преломления, чем оболочка. Луч, падающий из сердцевины на границу под достаточно большим углом к нормали, полностью отражается обратно. Это позволяет направлять световой сигнал вдоль волокна.", "In an optical fibre the core has a higher refractive index than the cladding. A core ray hitting the interface at a sufficiently large angle to the normal reflects entirely back. This guides a light signal along the fibre.", "Оптикалық талшық өзегінің сыну көрсеткіші қабықшадан жоғары. Өзектен шекараға нормальмен жеткілікті үлкен бұрыш жасап түскен сәуле толық кері шағылады. Осылай жарық сигналы талшық бойымен бағытталады."],
  "11.46": ["Цефеида — пульсирующая переменная звезда. Измерив период изменения блеска, по откалиброванной связи оценивают её светимость. Затем сравнивают истинную мощность излучения с потоком у наблюдателя: чем дальше звезда, тем слабее поток при той же светимости.", "A Cepheid is a pulsating variable star. Its brightness period and a calibrated relation give an estimate of its luminosity. Compare that emitted power with the flux at the observer: for equal luminosity a more distant star produces less flux.", "Цефеида — лүпілдейтін айнымалы жұлдыз. Жарқыл өзгерісінің периодын өлшеп, калибрленген байланыстан жарықтылығы бағаланады. Сәуле қуаты бақылаушыдағы ағынмен салыстырылады: жарықтылығы бірдей болса, алысырақ жұлдыз ағыны әлсіз."],
  "7.1": ["Упавший лист, тающая льдинка и радуга — примеры разных явлений: механического, теплового и оптического. Удобно спрашивать не «что я вижу?», а «что именно меняется?»: положение листа, состояние воды или направление света. Одно событие может сочетать несколько явлений — например, летящая снежинка одновременно движется и тает.", "A falling leaf, melting ice and a rainbow illustrate mechanical, thermal and optical phenomena. Ask what changes: the leaf’s position, the state of water or the direction of light. One event can combine phenomena: a falling snowflake may move and melt at the same time.", "Түскен жапырақ, еріген мұз және кемпірқосақ механикалық, жылулық және оптикалық құбылыстарды көрсетеді. «Не өзгерді?» деп қара: жапырақтың орны, судың күйі немесе жарықтың бағыты. Бір оқиғада бірнеше құбылыс қатар жүреді: қар ұлпасы құлап келе жатып еруі мүмкін."],
  "7.2": ["Гипотеза — проверяемое предположение о причине наблюдаемого явления. Если кажется, что ветер ускоряет испарение, недостаточно сравнить лужу в тени с лужей на солнце. Нужны одинаковые сосуды, количество воды и температура; отличаться должен обдув. Так эксперимент отделяет действие выбранного фактора от посторонних различий.", "A hypothesis is a testable explanation of an observation. To test whether wind speeds evaporation, comparing a shaded puddle to a sunny one is not enough. Match containers, water amounts and temperature; change the airflow. The experiment then separates the chosen factor from other differences.", "Гипотеза — бақыланған құбылыстың себебі туралы тексерілетін болжам. Жел булануды тездететінін тексеруге күн мен көлеңкедегі шалшықтарды салыстыру жеткіліксіз. Ыдыс, су мөлшері, температура бірдей болып, тек ауа ағыны өзгеруі қажет. Осылай таңдалған фактордың әсері ажыратылады."],
  "7.7": ["При переходе в другую систему отсчёта тело не меняется — меняется способ описания. Если два велосипедиста едут рядом с одинаковыми скоростями, расстояние между ними постоянно. Каждый движется относительно дороги, но покоится относительно другого. Поэтому у сообщения «скорость равна нулю» должен быть указан наблюдатель.", "Changing frames does not change the body, only its description. If two cyclists ride alongside at equal velocities, their separation stays fixed. Each moves relative to the road but rests relative to the other. A statement of zero velocity therefore needs a reference frame.", "Санақ жүйесін ауыстырғанда дене емес, сипаттау тәсілі өзгереді. Екі велосипедші қатар тең жылдамдықпен жүрсе, аралығы өзгермейді. Әрқайсысы жолға қатысты қозғалып, екіншісіне қатысты тыныш тұрады. Сондықтан нөл жылдамдық үшін санақ жүйесі көрсетіледі."],
  "7.18": ["Жёсткость пружины показывает, какая дополнительная сила нужна для единичного удлинения. Удлинение измеряют от естественной длины, а не от начала линейки. Знак минус в законе Гука означает, что пружина тянет растянутый конец обратно; модуль силы положителен.", "Spring stiffness is the extra force per unit extension. Measure extension from the natural length, not the ruler origin. The minus sign in Hooke’s law means the spring pulls the stretched end back; the force magnitude is positive.", "Серіппе қатаңдығы бірлік ұзаруға қажетті қосымша күшті көрсетеді. Ұзаруды сызғыш басынан емес, табиғи ұзындықтан есептейді. Гук заңындағы минус серіппенің керілген ұшын кері тартуын білдіреді, күш модулі оң."],
  "7.22": ["Когда человек стоит на лыжах, его вес почти тот же, что и без них, но снег проседает меньше. Лыжи распределяют нагрузку по большей площади. Давление нельзя путать с силой: равные силы способны дать разное давление, а площадь в расчёте — именно площадь контакта.", "A skier weighs nearly the same with and without skis, yet sinks less with them. Skis spread the load over more area. Pressure is not force: equal forces can give different pressures, and the area is the actual contact area.", "Адам шаңғыда тұрғанда салмағы шамамен өзгермейді, бірақ қарға азырақ батады. Шаңғы жүктемені үлкен ауданға таратады. Қысым күш емес: тең күштер әртүрлі қысым береді, ал есепке нақты жанасу ауданы алынады."],
  "7.33": ["Простой механизм меняет величину или направление требуемой силы. На идеальной наклонной плоскости ту же высоту набирают по более длинному пути. Поднимать легче не потому, что груз стал легче, а потому, что та же работа распределена по большей длине.", "A simple machine changes the size or direction of the required force. An ideal ramp reaches the same height along a longer path. The load has not become lighter: the same work is spread over a greater distance.", "Қарапайым механизм қажетті күштің шамасын не бағытын өзгертеді. Идеал көлбеу жазықтықпен сол биіктікке ұзағырақ жолмен көтеріледі. Жүк жеңілдеген жоқ, бірдей жұмыс ұзын жолға бөлінді."],
  "8.8": ["Удельная теплота сгорания — энергия, выделяемая при полном сгорании единицы массы топлива. Она характеризует топливо, а не устройство. Даже если известно, сколько энергии выделила горелка, нагреваемая вода получит не всю эту энергию: часть уйдёт в воздух и стенки.", "Specific heat of combustion is the energy released per unit mass of fuel burned completely. It describes the fuel, not the appliance. Water above a burner receives only part of the released energy because the burner and air also warm.", "Меншікті жану жылуы — отынның бірлік массасы толық жанғанда бөлінетін энергия. Ол құрылғыны емес, отынды сипаттайды. Жанарғыдағы судан басқа ауа мен ыдыс та қызатындықтан, су бүкіл энергияны алмайды."],
  "8.23": ["Электрическая цепь образует замкнутый путь через источник, соединительные провода и потребитель. Выключатель разрывает этот путь. Если две лампы стоят последовательно, разрыв отключает обе; при параллельном соединении целая ветвь может продолжить работу.", "A circuit forms a closed path through the source, wires and load. A switch breaks that path. A break disables both lamps in series, whereas an intact parallel branch can keep working.", "Электр тізбегі көз, сымдар және тұтынушы арқылы тұйық жол құрады. Ажыратқыш осы жолды үзеді. Тізбектей екі шамның жолы үзілсе, екеуі де сөнеді; параллель жалғауда бүтін тармақ жұмысын жалғастыра алады."],
  "9.21": ["Реактивное движение возникает, когда от тела отделяется часть его массы и уносит импульс. Надутый шарик движется, выпуская воздух в противоположную сторону. Ему не требуется отталкиваться струёй от стены: изменение импульса видно уже в системе «шарик и выходящий воздух».", "Jet motion occurs when a body expels mass carrying momentum. An inflated balloon moves as air escapes the other way. Its jet does not need a wall to push against: momentum exchange takes place between the balloon and the escaping air.", "Реактивтік қозғалыс дене массасының бөлігі бөлініп, импульс алып кеткенде пайда болады. Үрленген шар ауаны қарсы жаққа шығарғанда қозғалады. Ағынның қабырғаға тірелуі қажет емес: импульс шар мен шыққан ауа арасында алмасады."],
  "10.46": ["Сила Ампера действует на проводник с током во внешнем магнитном поле. Важна поперечная полю составляющая длины проводника: параллельный полю прямой участок не испытывает такой силы. При обращении тока направление силы меняется на противоположное.", "The magnetic force on a current-carrying wire depends on its component transverse to the external field. A straight segment parallel to the field experiences no such force. Reversing current reverses the force.", "Ампер күші сыртқы магнит өрісіндегі токты өткізгішке әсер етеді. Өріс бағытына көлденең ұзындық құраушысы маңызды: параллель түзу бөлікке мұндай күш түспейді. Ток кері бұрылса, күш бағыты да өзгереді."],
  "10.47": ["Магнитная составляющая силы Лоренца перпендикулярна скорости заряженной частицы. Поэтому одно лишь магнитное поле меняет направление движения, но не кинетическую энергию. Если скорость направлена вдоль поля, отклонения нет; при движении поперёк однородного поля получается окружность.", "The magnetic Lorentz force is perpendicular to a charged particle’s velocity. A magnetic field alone changes direction but not kinetic energy. Parallel motion is undeflected; motion perpendicular to a uniform field is circular.", "Лоренц күшінің магниттік құраушысы зарядталған бөлшек жылдамдығына перпендикуляр. Магнит өрісінің өзі бағытты өзгертеді, кинетикалық энергияны өзгертпейді. Өріс бойымен ауытқу жоқ, біртекті өріске көлденең қозғалыс шеңбер болады."],
  "11.1": ["Уравнение гармонического движения связывает координату и время. Амплитуда задаёт высоту волны на графике, период — расстояние по оси времени между соседними вершинами, начальная фаза — где на кривой находится точка при запуске часов. График не изображает форму траектории груза: сам груз может двигаться по прямой.", "The harmonic motion equation relates position to time. Amplitude sets the graph height, period the time between adjacent peaks, and initial phase the point on the curve when the clock starts. The graph is not the path of the mass: the mass can move along a straight line.", "Гармоникалық қозғалыс теңдеуі координатаны уақытпен байланыстырады. Амплитуда график биіктігін, период көрші шыңдардың уақыт аралығын, бастапқы фаза сағат қосылғандағы нүктені анықтайды. График жүктің траекториясы емес: жүк түзу бойымен қозғала алады."],
  "11.24": ["Полное внутреннее отражение возможно при переходе из оптически более плотной среды в менее плотную. При критическом угле преломлённый луч идёт вдоль границы; при большем угле распространяющегося преломлённого луча уже нет. Угол измеряют от нормали внутри первой среды.", "Total internal reflection requires propagation from higher to lower refractive index. At the critical angle the refracted ray runs along the interface; beyond it no propagating refracted ray exists. Measure incidence from the normal in the first medium.", "Толық ішкі шағылу сыну көрсеткіші жоғары ортадан төмен ортаға өткенде мүмкін. Шекті бұрышта сынған сәуле шекара бойымен кетеді, одан үлкен бұрышта таралатын сынған сәуле жоқ. Бұрыш бірінші ортадағы нормальдан өлшенеді."]
};

// Adapted from the highlighted boxes; page numbers refer to the printed textbook.
const bookDefinitions={
 "7.1": [
  [
   8,
   [
    "Физическое тело — отдельный предмет, имеющий форму и объём. Вещество — материал, из которого образовано тело. При физическом явлении не образуется другое вещество.",
    "A physical body is a distinct object with shape and volume. A substance is the material of a body. A physical change does not produce a new substance.",
    "Физикалық дене — пішіні мен көлемі бар жеке нәрсе. Зат — денені құрайтын материал. Физикалық құбылыс кезінде басқа зат түзілмейді."
   ]
  ]
 ],
 "8.1": [
  [
   6,
   [
    "Тепловое движение — беспорядочное движение атомов и молекул вещества.",
    "Thermal motion is the random motion of the atoms and molecules of matter.",
    "Жылулық қозғалыс — зат атомдары мен молекулаларының ретсіз қозғалысы."
   ]
  ],
  [
   8,
   [
    "Броуновское движение — непрерывное беспорядочное движение взвешенных в жидкости или газе мелких частиц из-за ударов молекул среды.",
    "Brownian motion is the continuous random motion of small suspended particles caused by molecular impacts in a liquid or gas.",
    "Броундық қозғалыс — сұйықта не газда қалқып жүрген ұсақ бөлшектердің орта молекулаларының соққысынан ретсіз, үздіксіз қозғалуы."
   ]
  ],
  [
   8,
   [
    "Диффузия — взаимное проникновение частиц веществ вследствие их теплового движения.",
    "Diffusion is the intermingling of particles of substances through thermal motion.",
    "Диффузия — жылулық қозғалыс салдарынан зат бөлшектерінің өзара енуі."
   ]
  ]
 ],
 "8.2": [
  [
   11,
   [
    "Температура — физическая величина, характеризующая тепловое состояние тела.",
    "Temperature is a physical quantity describing a body's thermal state.",
    "Температура — дененің жылулық күйін сипаттайтын физикалық шама."
   ]
  ],
  [
   12,
   [
    "Тепловое равновесие — состояние тел в тепловом контакте, при котором их температуры равны и нет суммарной передачи теплоты.",
    "Thermal equilibrium is the state of bodies in thermal contact with equal temperatures and no net heat transfer.",
    "Жылулық тепе-теңдік — жанасқан денелердің температуралары тең болып, қорытқы жылу алмасу болмайтын күй."
   ]
  ]
 ],
 "8.3": [
  [
   16,
   [
    "Внутренняя энергия — сумма энергии теплового движения частиц тела и потенциальной энергии их взаимодействия.",
    "Internal energy is the sum of the thermal kinetic energy of a body's particles and the potential energy of their interactions.",
    "Ішкі энергия — дене бөлшектерінің жылулық қозғалыс энергиясы мен өзара әрекеттесуінің потенциалдық энергиясының қосындысы."
   ]
  ],
  [
   19,
   [
    "Теплопередача — передача энергии от более нагретого тела к менее нагретому вследствие разности температур.",
    "Heat transfer is the transfer of energy from a hotter body to a colder body due to a temperature difference.",
    "Жылу берілу — температура айырмасынан энергияның ыстық денеден салқын денеге өтуі."
   ]
  ]
 ],
 "8.4": [
  [
   21,
   [
    "Теплопроводность — перенос энергии от более нагретых частей тела к менее нагретым за счёт движения и взаимодействия частиц, без общего течения вещества.",
    "Conduction transfers energy from hotter regions to colder ones through particle motion and interactions without bulk flow.",
    "Жылуөткізгіштік — зат тұтас ақпай, бөлшектердің қозғалысы мен әрекеттесуі арқылы энергияның ыстық бөліктен салқын бөлікке берілуі."
   ]
  ],
  [
   23,
   [
    "Конвекция — перенос энергии потоками жидкости или газа.",
    "Convection is energy transport by the bulk motion of a liquid or gas.",
    "Конвекция — сұйық не газ ағындарының энергия тасымалдауы."
   ]
  ],
  [
   24,
   [
    "Излучение как способ теплопередачи — испускание, перенос и поглощение энергии электромагнитных волн.",
    "Radiative heat transfer involves emission, transport and absorption of electromagnetic energy.",
    "Сәуле арқылы жылу берілу электромагниттік энергияның шығарылуын, тасымалдануын және жұтылуын қамтиды."
   ]
  ]
 ],
 "9.1": [
  [
   6,
   [
    "Механическое движение — изменение положения тела относительно других тел с течением времени. Кинематика описывает это движение, не рассматривая его причин.",
    "Mechanical motion is a change of position relative to other bodies over time. Kinematics describes it without considering its causes.",
    "Механикалық қозғалыс — дененің басқа денелерге қатысты орнының уақыт бойынша өзгеруі. Кинематика қозғалысты себептерін қарастырмай сипаттайды."
   ]
  ],
  [
   8,
   [
    "Материальная точка — модель тела, формой и размерами которого в данной задаче можно пренебречь.",
    "A point particle models a body whose shape and size can be neglected for the problem at hand.",
    "Материалдық нүкте — берілген есепте пішіні мен өлшемін елемеуге болатын дененің моделі."
   ]
  ]
 ],
 "9.2": [
  [
   16,
   [
    "Проекция вектора на ось — величина со знаком, равная разности координат конца и начала вектора на этой оси.",
    "A vector component along an axis is the signed difference between its endpoint and starting coordinates on that axis.",
    "Вектордың осьтегі проекциясы — сол осьтегі соңғы және бастапқы нүкте координаталарының таңбалы айырмасы."
   ]
  ]
 ],
 "9.3": [
  [
   20,
   [
    "Среднее ускорение — изменение вектора скорости, делённое на промежуток времени, за который оно произошло.",
    "Average acceleration is the change in the velocity vector divided by the elapsed time.",
    "Орташа үдеу — жылдамдық векторы өзгерісінің сол өзгеріс болған уақытқа қатынасы."
   ]
  ]
 ],
 "10.2": [
  [
   10,
   [
    "Погрешность измерения характеризует отклонение измеренного значения от истинного. На практике истинное значение обычно неизвестно и погрешность приходится оценивать.",
    "Measurement error is the deviation of a measured value from the true value. In practice the true value is usually unknown and the error must be estimated.",
    "Өлшеу қатесі өлшенген мәннің шын мәннен ауытқуын сипаттайды. Шын мән әдетте белгісіз болғандықтан, қатені бағалайды."
   ]
  ]
 ],
 "10.4": [
  [
   23,
   [
    "Относительная скорость — скорость тела в подвижной системе отсчёта. Переносная скорость здесь — скорость поступательно движущейся системы относительно неподвижной.",
    "Relative velocity is the body's velocity in the moving frame. Here transport velocity is the translating frame's velocity relative to the fixed frame.",
    "Салыстырмалы жылдамдық — дененің қозғалмалы жүйедегі жылдамдығы. Мұндағы тасымал жылдамдық — ілгерілемелі жүйенің қозғалмайтын жүйеге қатысты жылдамдығы."
   ]
  ]
 ],
 "11.1": [
  [
   7,
   [
    "Фаза гармонического колебания — угловая величина, определяющая, на каком этапе цикла находится система в данный момент.",
    "The phase of a harmonic oscillation is the angle specifying the system's current stage in its cycle.",
    "Гармоникалық тербеліс фазасы — жүйенің осы сәтте циклдің қай бөлігінде екенін анықтайтын бұрыштық шама."
   ]
  ],
  [
   9,
   [
    "Сдвиг фаз — разность фаз двух гармонических колебаний одинаковой частоты, записанных через одну и ту же тригонометрическую функцию.",
    "Phase shift is the difference in phase between equal-frequency harmonic oscillations written with the same trigonometric function.",
    "Фазалық ығысу — бірдей тригонометриялық функциямен жазылған жиіліктері тең тербелістер фазаларының айырымы."
   ]
  ]
 ]
};
const bookDiagrams={
 "7.10": [
  [
   "motion-graphs",
   3,
   [
    "Сравни строки ускорения, скорости и координаты в одном столбце. Один столбец описывает одно движение.",
    "Read acceleration, velocity and position down one column. Each column describes a single motion.",
    "Үдеу, жылдамдық және координата жолдарын бір бағанмен салыстыр. Бір баған бір қозғалысты сипаттайды."
   ]
  ]
 ],
 "9.3": [
  [
   "motion-graphs",
   3,
   [
    "Сравни строки ускорения, скорости и координаты в одном столбце. Один столбец описывает одно движение.",
    "Read acceleration, velocity and position down one column. Each column describes a single motion.",
    "Үдеу, жылдамдық және координата жолдарын бір бағанмен салыстыр. Бір баған бір қозғалысты сипаттайды."
   ]
  ]
 ],
 "9.4": [
  [
   "motion-graphs",
   3,
   [
    "Сравни строки ускорения, скорости и координаты в одном столбце. Один столбец описывает одно движение.",
    "Read acceleration, velocity and position down one column. Each column describes a single motion.",
    "Үдеу, жылдамдық және координата жолдарын бір бағанмен салыстыр. Бір баған бір қозғалысты сипаттайды."
   ]
  ]
 ],
 "10.3": [
  [
   "motion-graphs",
   3,
   [
    "Сравни строки ускорения, скорости и координаты в одном столбце. Один столбец описывает одно движение.",
    "Read acceleration, velocity and position down one column. Each column describes a single motion.",
    "Үдеу, жылдамдық және координата жолдарын бір бағанмен салыстыр. Бір баған бір қозғалысты сипаттайды."
   ]
  ]
 ],
 "10.21": [
  [
   "isoprocesses",
   7,
   [
    "Каждый столбец сохраняет одну величину. Сначала прочитай подписи осей: одна и та же изотерма по-разному выглядит в координатах p–V и V–T.",
    "One quantity is fixed in each column. Read the axes first: the same isotherm looks different in p–V and V–T coordinates.",
    "Әр бағанда бір шама тұрақты. Алдымен осьтерді оқы: бір изотерма p–V және V–T координаталарында әртүрлі көрінеді."
   ]
  ]
 ],
 "8.10": [
  [
   "heat-stages",
   7,
   [
    "Наклонные участки соответствуют изменению температуры, горизонтальные — фазовому переходу при постоянном давлении.",
    "Sloping sections show temperature change; plateaus mark a phase transition at constant pressure.",
    "Көлбеу бөліктер температура өзгерісін, көлденең бөліктер тұрақты қысымдағы фазалық ауысуды көрсетеді."
   ]
  ]
 ],
 "8.11": [
  [
   "heat-stages",
   7,
   [
    "Наклонные участки соответствуют изменению температуры, горизонтальные — фазовому переходу при постоянном давлении.",
    "Sloping sections show temperature change; plateaus mark a phase transition at constant pressure.",
    "Көлбеу бөліктер температура өзгерісін, көлденең бөліктер тұрақты қысымдағы фазалық ауысуды көрсетеді."
   ]
  ]
 ],
 "8.12": [
  [
   "heat-stages",
   7,
   [
    "Наклонные участки соответствуют изменению температуры, горизонтальные — фазовому переходу при постоянном давлении.",
    "Sloping sections show temperature change; plateaus mark a phase transition at constant pressure.",
    "Көлбеу бөліктер температура өзгерісін, көлденең бөліктер тұрақты қысымдағы фазалық ауысуды көрсетеді."
   ]
  ]
 ],
 "9.25": [
  [
   "mechanical-oscillations",
   11,
   [
    "Сопоставь координату и скорость в один момент времени. В крайней точке скорость равна нулю, а потенциальная энергия максимальна.",
    "Compare position and velocity at the same instant. At a turning point speed vanishes and potential energy is greatest.",
    "Бір мезеттегі координата мен жылдамдықты салыстыр. Шеткі нүктеде жылдамдық нөл, потенциалдық энергия ең үлкен."
   ]
  ]
 ],
 "11.1": [
  [
   "mechanical-oscillations",
   11,
   [
    "Сопоставь координату и скорость в один момент времени. В крайней точке скорость равна нулю, а потенциальная энергия максимальна.",
    "Compare position and velocity at the same instant. At a turning point speed vanishes and potential energy is greatest.",
    "Бір мезеттегі координата мен жылдамдықты салыстыр. Шеткі нүктеде жылдамдық нөл, потенциалдық энергия ең үлкен."
   ]
  ]
 ],
 "11.3": [
  [
   "mechanical-oscillations",
   11,
   [
    "Сопоставь координату и скорость в один момент времени. В крайней точке скорость равна нулю, а потенциальная энергия максимальна.",
    "Compare position and velocity at the same instant. At a turning point speed vanishes and potential energy is greatest.",
    "Бір мезеттегі координата мен жылдамдықты салыстыр. Шеткі нүктеде жылдамдық нөл, потенциалдық энергия ең үлкен."
   ]
  ],
  [
   "electrical-oscillations",
   11,
   [
    "При максимальном модуле заряда конденсатора ток на мгновение исчезает. Сравни графики энергии обоих полей вдоль одной вертикали времени.",
    "At maximum capacitor charge magnitude the current briefly vanishes. Compare both field energies at the same time coordinate.",
    "Конденсатор зарядының модулі ең үлкен сәтте ток нөл. Екі өрістің энергиясын бір уақыт мезетінде салыстыр."
   ]
  ]
 ],
 "9.28": [
  [
   "electrical-oscillations",
   11,
   [
    "При максимальном модуле заряда конденсатора ток на мгновение исчезает. Сравни графики энергии обоих полей вдоль одной вертикали времени.",
    "At maximum capacitor charge magnitude the current briefly vanishes. Compare both field energies at the same time coordinate.",
    "Конденсатор зарядының модулі ең үлкен сәтте ток нөл. Екі өрістің энергиясын бір уақыт мезетінде салыстыр."
   ]
  ]
 ],
 "11.2": [
  [
   "electrical-oscillations",
   11,
   [
    "При максимальном модуле заряда конденсатора ток на мгновение исчезает. Сравни графики энергии обоих полей вдоль одной вертикали времени.",
    "At maximum capacitor charge magnitude the current briefly vanishes. Compare both field energies at the same time coordinate.",
    "Конденсатор зарядының модулі ең үлкен сәтте ток нөл. Екі өрістің энергиясын бір уақыт мезетінде салыстыр."
   ]
  ]
 ],
 "7.16": [
  [
   "gravity",
   5,
   [
    "В знаменателе стоит расстояние между центрами, а не высота над поверхностью.",
    "The denominator uses centre-to-centre distance, not height above the surface.",
    "Бөлімде беттен биіктік емес, центрлер аралығы тұр."
   ]
  ]
 ],
 "9.17": [
  [
   "gravity",
   5,
   [
    "В знаменателе стоит расстояние между центрами, а не высота над поверхностью.",
    "The denominator uses centre-to-centre distance, not height above the surface.",
    "Бөлімде беттен биіктік емес, центрлер аралығы тұр."
   ]
  ]
 ],
 "10.8": [
  [
   "gravity",
   5,
   [
    "В знаменателе стоит расстояние между центрами, а не высота над поверхностью.",
    "The denominator uses centre-to-centre distance, not height above the surface.",
    "Бөлімде беттен биіктік емес, центрлер аралығы тұр."
   ]
  ]
 ]
};

for(const [lesson,diagram] of Object.entries({
 "9.19": [
  "throw-range",
  4,
  [
   "Траектория при равной высоте старта и финиша.",
   "Trajectory for equal launch and landing heights.",
   "Бастапқы және соңғы биіктіктер тең болғандағы траектория."
  ]
 ],
 "10.6": [
  "throw-range",
  4,
  [
   "Траектория при равной высоте старта и финиша.",
   "Trajectory for equal launch and landing heights.",
   "Бастапқы және соңғы биіктіктер тең болғандағы траектория."
  ]
 ],
 "9.22": [
  "work-area",
  13,
  [
   "Площадь под графиком: сначала укажи оси, затем определяй физическую величину.",
   "Area under a graph: identify both axes before assigning physical meaning.",
   "График астындағы аудан: алдымен осьтерді анықтап, кейін физикалық мағынасын тап."
  ]
 ],
 "10.22": [
  "work-area",
  13,
  [
   "Площадь под графиком: сначала укажи оси, затем определяй физическую величину.",
   "Area under a graph: identify both axes before assigning physical meaning.",
   "График астындағы аудан: алдымен осьтерді анықтап, кейін физикалық мағынасын тап."
  ]
 ],
 "8.26": [
  "circuit-combinations",
  9,
  [
   "Последовательное и параллельное соединение: сравни общие токи и напряжения.",
   "Series and parallel circuits: compare shared currents and voltages.",
   "Тізбектей және параллель қосылыста ортақ ток пен кернеуді салыстыр."
  ]
 ],
 "10.36": [
  "circuit-combinations",
  9,
  [
   "Последовательное и параллельное соединение: сравни общие токи и напряжения.",
   "Series and parallel circuits: compare shared currents and voltages.",
   "Тізбектей және параллель қосылыста ортақ ток пен кернеуді салыстыр."
  ]
 ],
 "8.38": [
  "geometry-optics",
  12,
  [
   "Углы отражения и преломления отсчитывают от нормали.",
   "Angles of reflection and refraction are measured from the normal.",
   "Шағылу және сыну бұрыштары нормальдан өлшенеді."
  ]
 ],
 "8.40": [
  "geometry-optics",
  12,
  [
   "Углы отражения и преломления отсчитывают от нормали.",
   "Angles of reflection and refraction are measured from the normal.",
   "Шағылу және сыну бұрыштары нормальдан өлшенеді."
  ]
 ],
 "11.22": [
  "geometry-optics",
  12,
  [
   "Углы отражения и преломления отсчитывают от нормали.",
   "Angles of reflection and refraction are measured from the normal.",
   "Шағылу және сыну бұрыштары нормальдан өлшенеді."
  ]
 ],
 "11.24": [
  "geometry-optics",
  12,
  [
   "Углы отражения и преломления отсчитывают от нормали.",
   "Angles of reflection and refraction are measured from the normal.",
   "Шағылу және сыну бұрыштары нормальдан өлшенеді."
  ]
 ],
 "11.19": [
  "wave-optics",
  12,
  [
   "Сравни условия максимума и минимума интенсивности при сложении волн.",
   "Compare conditions for intensity maxima and minima in wave superposition.",
   "Толқындар қосылғанда қарқын максимумдары мен минимумдарының шарттарын салыстыр."
  ]
 ],
 "11.20": [
  "wave-optics",
  12,
  [
   "Сравни условия максимума и минимума интенсивности при сложении волн.",
   "Compare conditions for intensity maxima and minima in wave superposition.",
   "Толқындар қосылғанда қарқын максимумдары мен минимумдарының шарттарын салыстыр."
  ]
 ],
 "11.21": [
  "wave-optics",
  12,
  [
   "Сравни условия максимума и минимума интенсивности при сложении волн.",
   "Compare conditions for intensity maxima and minima in wave superposition.",
   "Толқындар қосылғанда қарқын максимумдары мен минимумдарының шарттарын салыстыр."
  ]
 ]
}))(bookDiagrams[lesson] ||= []).push(diagram);
