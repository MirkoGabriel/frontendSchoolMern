# Manual Usuario
El sistema cuanta con las secciones de administración estudiantes, materias, grupos, periodo.

## Students
-- List Students --

En esta seccion muestra solo los primeros 10 registros de la coleccion "students" ya que no seria logico mostrar los cientos de estudiantes.
Tambien para que se pueda ver mejor hay un filtro de alumnos por grupos, en los cuales se pueden editar datos (cambiar de grupo o periodo) y eliminarlos
-- Register Students --

Aca se registran los alumno asignandolos a un grupo y periodo (no se puede ingresar un alumno con el mismo nombre)
## Subjects
--List Subjects --

De igual manera muestra los 10 primeros registros de la colección "subjects"
Se pueden editar (asignarlos a otro grupo) y eliminar.
-- Register Subject --

Se ingresan las materias asignandolas a un grupo o curso (no se puede ingresar una materia con el mismo nombre)
## Groups
-Aca se ingresan los grupos y se listan al costado.

## Periods
-Aca se ingresan los periodos y se listan al costado.

## Ratings
-- Create Grades --

Aca se registran las notas de los alumnos solo al seleccionar el grupo o curso, muestran los alumnos y materias correspondientes a ese grupo, tambien al hacer "click" selecciona el periodo en el que cursa actualmente (no se puede ingresasar una misma nota del la misma materia del mismo alumno.
-- Students Reports --

En esta sección genera "el boletin", primero selecciono el grupo (esto sirve como filtro de alumnos nada mas no tiene que ver con las notas del alumno en un periodo, puesto que puede generar el boletin de un alumno que curso en 2018 un ese mismo habra cursado en un grupo distinto al que selecciono), a su vez selecciono el alumno a generar el boletin y por ultimo el periodo si hay notas en ese periodo genera las notas de otra forma muestrar un mensaje de error.

## Deploy de la App
http://mirko-school.herokuapp.com/
