# Scenariusze Testowe - opis działania
## Strona głónwa - zakładka Main Menu
Po otwarciu aplikacji powinniśmy się znaleźć w menu głównym z panelem po boku.
Naciśnięcie wybranego guzika przenosi nas do odpowiedniej podstrony.
W przypadku naciśnięcia guzika strony na której jesteśmy nie dzieje się nic.
Taki panel do nawigacji jest umieszczony na każdej z podstron.

## Podstrona Route Catalogue
Oprócz panelu nawigacyjnego widać tutaj 3 sekcje:

**W lewej** znajdują się obecne drogi wraz z ich właściwościami (id, nazwa, długość w km, czas w minutach).
Oprócz tego jest informacja o tym czy droga nadaje się do użytku, która podświetla się na zielono jeżeli droga
jest sprawna lub na pomarańczowo jeżeli wymaga naprawy.
Po naciśnięciu w wybraną drogę, podświetli się ona na czerwono oraz wyświetlą się dodatkowe informacje w dolnej sekcji.
Jednocześnie można wyświetlić informacje o jednej drodze na raz. Po naciśnięciu na inną drogę zawartość dolnej sekcji
odpowiednio się zaktualizuje.

**W prawej** jest opcja filtrowania dróg, które są wyświetlone. Początkowo żaden filtr nie jest ustawiony i wyświetlone
są wszystkie drogi.
Możemy ustawić następujące filtry:
+ minimalna i maksymalna długość drogi, możemy tu wprowadzić liczbę całkowitą lub zmienić wartość przy pomocy strzałek
+ minimalny i maksymalny czas drogi, analogiczne wprowadzanie wartośći
+ czy dany element drogi jest obecnie niesprawny, jest to zrealizowane za pomocą chceckbox-ów i możemy wybrać nastęujące
elementy: semaphore, pressurization port, exit, pylon, tubing
W przydaku wyboru wielu elementów wystarczy, że na drodze będzie niesprawny chociaż jeden z zaznaczonych i droga wyświetli
się na liście.

Wybrane filtry wprowadzamy naciskając przycisk Apply Filters. Jeżeli wprowadzone dane były poprawne lista wyświetlanych
dróg zostanie zaktualizowana. Lista nie zostanie zaktualizowana w przypadku wprowadzenia złych do filtrów dotyczących
długości lub czasu drogi tzn:
+ znaków innych niż liczby - zostaniemy poproszeni o wprowadzenie liczby
+ liczby niecałkowitej - zostaniemy poproszeni o wprowadzenie liczby całkowitej oraz będą podane 2 najbliższe l. całkowite
Przycisk Clear Filters usuwa wybrane filtry i wszystkie drogi zostają wyświetlone. Również dane w formularzu są czyszczone.

**W dolnej** zostają wyświetlone dodatkowe informacje po wybraniu konkretnej drogi, są to:
nazwa wybranej drogi, poniżej stacje w kolejności przez które przebiega droga (numer w kolejnośći, id oraz nazwa),
a najniżej kapsuły, które są przypisane do danej drogi (id oraz nazwa). W przypadku braku przypisanych kapsuł to
pole jest puste.

## Podstrona Management
Oprócz panelu nawigacyjnego widać tutaj 4 sekcje:

**W lewej** jest lista wszystkich odcinków z jednego miasta do drugiego opisanych numerem ID oraz miastem początkowym i
końcowym. Listę można przewijać scrollem. Po najechaniu myszką na odcinek z listy zostanie on podświetlone, a po naciśnięciu
wyświetlą się o nim informacje w dolnej sekcji.

**W środkowej** jest możliwość dodania nowej drogi. W pole nazwa musimy wprowadzić nazwę. Maksymalnie można wprowadzić 30 znaków.
Musimy też wybrać odcinki, z których droga ma się składać. Naciskamy podwójnie na wybrane odcinek, zostaje on przeniesione do
sekcji dodawania. Jeżeli chcemy możemy wybrać następne odcinki. Te muszą mieć identyczne miasto począkowe zgodne z miastem końcowym
ostatnio dodanego odcinka. Na liście odcików, wszystkie odcinki które nie spełniają tego warunku zostaną wszarzone i wciśnięcie ich
nie dodaje ich do tworzonej drogi. Jeżeli nazwaliśmy drogę oraz wybraliśmy minimum jeden odcinek z którego ma się składać to przycisk
Add Route utworzy drogę - inaczej żadana akcja nie zostanie wykonana. Po dodaniu drogi panel zostaje wyczyszczony. Panel możemy
wyczyścić wciskając na przycisk clear. Obecnie utworzone drogi możemy zobaczyć na podstronie Route Catalogue.

**W prawej** można wykonać następujące operacje:
+ usuwanie dróg - wpisujemy ID wybranej drogi i po naciśnięciu przycisku Delete Route zostaje ona usunięta. Jeżeli zamiast liczby
podamy inne znaki lub liczbę niecałkowitą to zostaniemy poproszeni o podanie liczby całkowitej i operacja nie zostanie wykonana.
Jeżeli podamy nieistniejące ID to otrzymamy stosowny komunikat, że nie ma takiej drogi.
+ przypisywanie kapsuł do dróg - mamy listę kapsuł wraz z ich ID, nazwą oraz typem. Listę możemy przewijać. Pod listą możemy
wpisać ID kapsuły oraz ID drogi. Podobnie jak przy usuwaniu dróg aplikacja pilnuje, aby były to liczby całkowite. Po podaniu obu
ID możemy nacisnąć przycisk Assign Capsule, aby przypisać kapsułę do drogi. Jeżeli oba ID są istniejące to kaspuła zostanie przypisana.
Jeżeli była przypisana już wcześniej to otrzymamy komunikat o poprawie wypełnionym zapytaniu jednak nie zostanie ona faktycznie
przypisana. Przyciskiem Unassign Capsule możemy usunąć kapusłę z drogi i podobnie w przypdaku podania istniejących ID zostanie ona
wypisana, a jeżeli nie było takiej kapsuły to dostaniemy komunikat o wypisaniu, ale faktycznie nic się nie stanie.
+ aktualizowanie infrastruktury - wpisujemy ID elementu (aplikacja dba o to aby to była l. całkowita) oraz wpisujemy stan w jakim
ma być wybrany element, tutaj możemy wpisać literę A - oznacza stan poprawny, B - element wymaga naprawy. Jeżeli podamy inny znak
dostaniemy komunikat o niepoprawnym stanie. W przypadku podania operacji zmiany zgodnej z obecnym stanem nic się zmieni.

**W dolnej** po naciśnięciu odcinka z listy wyświetlą się o nim szczegółowe informacje: ID, nazwa stacji począkowej i końcowej,
długość oraz maksymalna prędkość. Wyświetlą się również wszystkie elementy odcinka: semaphore, pressurization port, exit, pylon,
tubing. Przy elementach jest napisane ich ID, nazwa, oraz informacja o stanie podświetlona na zielono jeżli jest sprawny lub na
pomarańczowo jeżeli wymaga naprawy. Jednocześnie mogą być wyświetlana informacje o jednym połączeniu na raz. W celu zmiany należy
nacisnąć na inny odcinek z listy.

## Podstrona Reports
Oprócz panelu nawigacyjnego widać tutaj 2 sekcje:

**W lewej** jest lista dróg, które mają jakieś elementy wymagające naprawy.

**W prawej** jest lista raportów dotyczących stanu poszczególnych elementów. Pole raportu zawiera:
ID, ID elementu, ID odcinka, datę wykrycia, datę naprawy (jeżeli została naprawiona) oraz obecny stan - w trakcie lub naprawiony.
Raporty generują się automatycznie po wprowadzeniu zmian w stanie elementów na podstronie Management w sekcji Update Infrastructure
State.