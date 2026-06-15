Ejemplos de Flatpickr

A menos que se especifique lo contrario, el marcado para los ejemplos a continuación consiste solo en un elemento input y la invocación de flatpickr con una configuración dada.

Básico

flatpickr sin ninguna configuración.

// Invocación básica
flatpickr("#my-input");


Fecha y Hora (DateTime)

{
  enableTime: true,
  dateFormat: "Y-m-d H:i",
}


Fechas legibles para humanos

altInput oculta tu input original y crea uno nuevo.

Tras la selección de la fecha, el input original contendrá una cadena con formato Y-m-d..., mientras que el altInput mostrará la fecha en un formato más legible y personalizable. Habilitar esta opción es altamente recomendado.

{
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
}


Después de seleccionar una fecha, inspecciona el input para ver cómo funciona.

Proporcionar Fechas para flatpickr

flatpickr tiene numerosas opciones que aceptan valores de fecha en una variedad de formatos. Éstas son:

defaultDate

minDate

maxDate

enable / disable

Los valores aceptados por estas opciones siguen las mismas pautas. Puedes especificar esas fechas en una variedad de formatos:

Objetos Date (Date Objects) siempre son aceptados: new Date(2015, 0, 10)

Marcas de tiempo (Timestamps) siempre son aceptadas: ej. 1488136398547

Cadenas de fecha ISO (ISO Date Strings) siempre son aceptadas: ej. "2017-02-26T19:40:03.243Z"

Cadenas de Fecha (Date Strings), las cuales deben coincidir cronológicamente con dateFormat (el valor por defecto es YYYY-MM-DD HH:MM). Esto significa que "2016", "2016-10", "2016-10-20", "2016-10-20 15", "2016-10-20 15:30" son todas cadenas de fecha válidas.

El atajo "today" (hoy).

Precargar una Fecha

La fecha seleccionada se analizará a partir del valor del input o de la opción defaultDate. Consulta arriba los ejemplos de formatos de fecha válidos.

minDate y maxDate

La opción minDate especifica la fecha mínima/más temprana (inclusive) permitida para la selección.

La opción maxDate especifica la fecha máxima/más tardía (inclusive) permitida para la selección.

{
  minDate: "2020-01"
}


{
  dateFormat: "d.m.Y",
  maxDate: "15.12.2017"
}


{
  minDate: "today"
}


{
  minDate: "today",
  maxDate: new Date().fp_incr(14) // 14 días a partir de ahora
}


Deshabilitar fechas

Si deseas que ciertas fechas no estén disponibles para su selección, existen múltiples métodos para hacerlo:

Deshabilitar fechas específicas.

Deshabilitar un rango de fechas.

Deshabilitar fechas usando una función.

Todas estas opciones son posibles mediante el uso de la opción disable.

1. Deshabilitar fechas específicas

{
  disable: ["2025-01-30", "2025-02-21", "2025-03-08", new Date(2025, 4, 9)],
  dateFormat: "Y-m-d"
}


2. Deshabilitar rango(s) de fechas:

{
  dateFormat: "Y-m-d",
  disable: [
    {
      from: "2025-04-01",
      to: "2025-05-01"
    },
    {
      from: "2025-09-01",
      to: "2025-12-01"
    }
  ]
}


3. Deshabilitar fechas mediante una función:

La función recibe un objeto Date y debe retornar un valor booleano (true o false).
Si la función retorna true, la fecha se deshabilitará. Esta flexibilidad nos permite usar cualquier lógica arbitraria para deshabilitar fechas. El ejemplo a continuación deshabilita sábados y domingos.

{
  "disable": [
    function(date) {
      // Retorna 'true' para deshabilitar
      return (date.getDay() === 0 || date.getDay() === 6);
    }
  ],
  "locale": {
    "firstDayOfWeek": 1 // Iniciar la semana en Lunes
  }
}


Habilitar fechas específicas (Inverso a disable)

Esta es la opción enable, que recibe un arreglo de cadenas de texto de fechas, rangos de fechas y funciones. Esencialmente es lo mismo que la opción disable mencionada arriba, pero a la inversa.

Habilitar fechas específicas

{
  enable: ["2025-03-30", "2025-05-21", "2025-06-08", new Date(2025, 8, 9)]
}


Habilitar rango(s) de fechas:

{
  enable: [
    {
      from: "2025-04-01",
      to: "2025-05-01"
    },
    {
      from: "2025-09-01",
      to: "2025-12-01"
    }
  ]
}


Habilitar fechas mediante una función:

{
  enable: [
    function(date) {
      // Retorna 'true' para habilitar
      return (date.getMonth() % 2 === 0 && date.getDate() < 15);
    }
  ]
}


Seleccionar múltiples fechas

Es posible seleccionar múltiples fechas activando el modo "multiple".

{
  mode: "multiple",
  dateFormat: "Y-m-d"
}


Precargar múltiples fechas

{
  mode: "multiple",
  dateFormat: "Y-m-d",
  defaultDate: ["2016-10-20", "2016-11-04"]
}


Personalizar la conjunción (Separador)

{
  mode: "multiple",
  dateFormat: "Y-m-d",
  conjunction: " :: "
}


Calendario de Rango (Range Calendar)

Selecciona un rango de fechas usando el calendario de rangos.

{
  mode: "range"
}


Ten en cuenta que las fechas deshabilitadas (ya sea por minDate, maxDate, enable o disable) no estarán permitidas en las selecciones.

{
  mode: "range",
  minDate: "today",
  dateFormat: "Y-m-d",
  disable: [
    function(date) {
      // Deshabilitar cada múltiplo de 8
      return !(date.getDate() % 8);
    }
  ]
}


Precargar fechas de rango

{
  mode: "range",
  dateFormat: "Y-m-d",
  defaultDate: ["2016-10-10", "2016-10-20"]
}


Selector de Hora (Time Picker)

{
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i"
}


Selector de hora de 24 horas

{
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  time_24hr: true
}


Selector de hora con Límites

{
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  minTime: "16:00",
  maxTime: "22:30"
}


Precargar Hora

{
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  defaultDate: "13:45"
}


DateTimePicker con Rango de Tiempo Limitado

{
  enableTime: true,
  minTime: "09:00"
}


{
  enableTime: true,
  minTime: "16:00",
  maxTime: "22:00"
}


Calendario en Línea (Inline Calendar)

Muestra el calendario en un estado de siempre-abierto con la opción inline.

{
  inline: true
}


Mostrar Números de Semana

Habilita la opción weekNumbers para mostrar el número de la semana en una columna a la izquierda del calendario.

{
  weekNumbers: true,
  
  /*
  Opcionalmente, puedes anular la función que extrae los números de semana
  de un objeto Date suministrando una función getWeek. Toma una fecha
  como parámetro y debe retornar una cadena correspondiente que deseas
  que aparezca a la izquierda de cada semana.
  */
  getWeek: function(dateObj) {
    // Tu lógica personalizada aquí
  }
}


flatpickr + Elementos Externos

flatpickr puede analizar un grupo de input de cajas de texto y botones, común en Bootstrap y otros frameworks.
Esto permite un marcado adicional, así como elementos personalizados para alternar el estado del calendario.

<div class="flatpickr">
  <input type="text" placeholder="Seleccionar Fecha.." data-input> <!-- input es obligatorio -->
  
  <a class="input-button" title="toggle" data-toggle>
    <i class="icon-calendar"></i>
  </a>
  
  <a class="input-button" title="clear" data-clear>
    <i class="icon-close"></i>
  </a>
</div>


{
  wrap: true
}


Nota: El selector para flatpickr debe ser el div envolvente con la clase flatpickr, y no la etiqueta input.

Análisis y Formato Personalizados

Personaliza el análisis (parsing) y formato de las fechas, por ejemplo, para soportar tokens de formato personalizados de librerías como Moment.js.

{
  altInput: true,
  dateFormat: "YYYY-MM-DD",
  altFormat: "DD-MM-YYYY",
  allowInput: true,
  
  parseDate: (datestr, format) => {
    return moment(datestr, format, true).toDate();
  },
  
  // El "locale" también puede ser usado aquí
  formatDate: (date, format, locale) => {
    return moment(date).format(format);
  }
}


2020 Publicado bajo la licencia MIT