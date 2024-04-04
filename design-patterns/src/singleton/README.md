Claves:
- El constructor es privado para prevenir la instanciación directa.
- El método estático `getInstance()` crea una instancia si no existe aún y la devuelve. Esto asegura que sólo se cree una instancia.

Es importante no juntar la clase singleton en sí (clase que construye la instancia si no existe y la devuelve) con la clase que instanciamos y obtenemos. Juntar ambas responsabilidades incumple el SRP.