Wszystko jest zrobione pod Androida więc na ios może nie działać, lepiej też nie odpalać przez WSL bo może być problem z wykryciem telefonu.

1. Przygotowanie:
    - Zklonować repo
    - Zainstalować Node.js
    - Zainstalować adb (Android Debug Bridge)
    - Zainstalować Android Studio (wtedy napewno zainstaluje się Android SDK które jest potrzebne)
    - Podłączyć telefon do komputera kablem
    - W telefonie odpalić w opcjach programisty Debugowanie USB

    Po tym wszystkim jak wpiszecie `adb devies` w powershell i wyświetli się wam wasz telefon to znaczy że wszystko jest git


2. W folderze projektu:
    - Wpisać `npm install` żeby zainstalować zależności
    - W folderze ./android dodać plik "local.properties" którego zawartość jest mniej więcej taka:
    """
        ## This file must *NOT* be checked into Version Control Systems,
        # as it contains information specific to your local configuration.
        #
        # Location of the SDK. This is only used by Gradle.
        # For customization when using a Version Control System, please read the
        # header note.
        #Sat Dec 03 21:40:35 CET 2022
        sdk.dir=<path u was na kompie do folderu Sdk>
    """

    u mnie jest: sdk.dir=C\:\\Users\\Olek\\AppData\\Local\\Android\\Sdk (trzeba takim zjebanym formatem)


3. Odpalenie aplikacji:
    - Żeby odpalić aplikacje na telefonie, wpisujemy `npx react-native run-android`, tak odpalona apka będzie działać do momentu aż jesteśmy podłączeni kablem i mamy odpalony proces na komputerze.
    - Żeby wgrać na telefon build aplikacji trzeba:
        1. Odinstalować z telefonu wersje wgrane poprzednio przez adb (unikamy konfliktów)
        2. wejść do folderu ./android
        3. w folderze android wpisujemy najpierw `./gradlew cleanBuildCache` (usuwamy poprzednie buildy o ile są) a potem `./gradlew assembleRelease`
        4. Na sam koniec instalujemy apke na telefon:
            `adb install -r ./app/build/outputs/apk/release/app-release.apk`
