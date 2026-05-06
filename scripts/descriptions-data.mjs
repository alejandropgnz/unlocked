// =============================================================================
// Hand-curated descriptions for the 1675 v2/v3 catalog logros that don't have
// one in the seed files. Combined with the 200 originals (already have
// descriptions in supabase/seed/achievements.sql), this powers the full
// migration that backfills description on every achievement row in the DB.
//
// Format per entry:
//   'slug': { description, newTitle? }
//
// - description: deadpan España voice. Short (5-15 words). Specific detail or
//   small reveal at the end. Same tone as the 200 originals.
// - newTitle (optional): only set when the existing title contains LATAM-isms
//   that need humanizing to España Spanish. Most entries leave the title
//   alone — only fix when there's a real wording problem.
//
// Generated in batches by file (v3-amigos first, then v3-relaciones, etc.).
// Each batch validated by Alejandro before moving to the next.
// =============================================================================

/** @type {Record<string, { description: string; newTitle?: string }>} */
export const NEW_DESCRIPTIONS = {
  // ===== v3-amigos (229) ============================================
  'cancele-un-plan-inventando-que-estaba-malo': {
    description: 'El malestar duró exactamente lo que el plan.',
    newTitle: 'Cancelé un plan diciendo que estaba malo',
  },
  'mantengo-silenciado-el-grupo-de-whatsapp-de-mis-amigos-del-c': {
    description: '1.247 mensajes sin leer. Cero remordimientos.',
  },
  'lei-el-mensaje-pense-que-responder-y-no-respondi-nunca': {
    description: 'Sigue ahí. Llevamos tres semanas.',
  },
  'dije-manana-fijo-sabiendo-que-no-iba-a-ir': {
    description: 'Lo dije muy convencido. Mentía a los dos.',
  },
  'cancele-un-plan-a-20-minutos-de-salir-de-casa': {
    description: 'Ya tenía los zapatos puestos. No me importó.',
  },
  'mande-un-bizum-cuatro-meses-despues-de-la-cena': {
    description: 'Con un "perdón, se me había ido". Mentira.',
  },
  'le-preste-dinero-a-un-amigo-y-nunca-me-lo-devolvio': {
    description: 'Lo doy por perdido. Lo doy por amistad rota.',
  },
  'copie-y-pegue-el-mismo-felicidades-a-cinco-personas-en-un-di': {
    description: 'Cambiando un emoji entre uno y otro.',
  },
  'felicite-un-cumple-tres-dias-tarde-y-disimule': {
    description: 'Sin mencionar el retraso. Como si nada.',
  },
  'olvide-el-cumpleanos-de-mi-mejor-amigo': {
    description: 'Lo vi en stories. Ya era tarde.',
  },
  'compre-el-regalo-de-boda-de-camino-a-la-boda': {
    description: 'El primer Amazon Go que pillé abierto.',
  },
  'llore-borracho-en-una-boda-diciendole-a-mi-amigo-que-le-quie': {
    description: 'Es mi mejor versión. Solo aparece a las 3am.',
  },
  'invente-una-excusa-elaboradisima-para-no-ir-a-una-boda': {
    description: 'Hubiera invertido menos tiempo yendo.',
  },
  'deje-de-seguir-en-instagram-a-mis-amigos-del-colegio-uno-a-u': {
    description: 'Sin avisar. Sin remordimientos. Sin mirar atrás.',
  },
  'silencie-las-stories-de-mis-amigos-pero-sigo-vigilandolas': {
    description: 'Lo de Instagram es bueno: saben dónde miras.',
  },
  'vi-por-stories-un-plan-al-que-no-me-invitaron': {
    description: 'Conté cuántos eran. Faltaba yo.',
  },
  'fingi-no-haber-visto-el-mensaje-cuando-me-pregunto-si-queria': {
    description: 'Llevo tres meses así. El doble check sigue gris.',
  },
  'mande-un-audio-de-cuatro-minutos-al-grupo-y-nadie-lo-escucho': {
    description: 'El reproducido se quedó en el segundo 12.',
  },
  'en-mi-grupo-solo-hablamos-a-base-de-memes-desde-2022': {
    description: 'Las palabras desaparecieron. Los memes evolucionaron.',
  },
  'mi-grupo-principal-lleva-tres-meses-sin-un-solo-mensaje': {
    description: 'Nadie quiere ser el primero en escribir.',
  },
  'ignore-una-llamada-de-un-amigo-aposta-y-le-mande-ahora-no-pu': {
    description: 'Sigo sin saber qué quería. No he preguntado.',
  },
  'llego-tarde-a-todos-los-planes-y-todos-lo-saben': {
    description: 'Me dicen una hora antes. Sigo llegando tarde.',
  },
  'le-dije-a-mi-amigo-que-era-una-hora-antes-para-que-llegase-a': {
    description: 'Funcionó. Ahora lo sabe. Sigue funcionando.',
  },
  'espere-una-hora-solo-en-un-bar-a-un-amigo-que-no-daba-senale': {
    description: 'Llegó. Sin disculpas. Como si nada.',
  },
  'conte-borracho-un-secreto-que-me-habian-pedido-que-no-contar': {
    description: 'A las 3am parecía buena idea contarlo.',
  },
  'filtre-un-cotilleo-que-iba-a-cambiarle-la-vida-a-alguien': {
    description: 'Lo conté como anécdota. Cambió cosas.',
  },
  'estuvimos-seis-meses-sin-hablar-por-una-chorrada': {
    description: 'Ya ni recuerdo qué fue. Él tampoco.',
  },
  'perdone-a-una-amiga-simplemente-porque-me-daba-pereza-seguir': {
    description: 'El rencor era un curro a tiempo completo.',
  },
  'fingi-reconciliarme-con-un-amigo-y-nunca-volvi-a-quedar-con': {
    description: 'Nos abrazamos. No nos llamamos más.',
  },
  'soy-el-tercero-en-mi-grupo-de-tres-y-me-he-dado-cuenta-este': {
    description: 'Las decisiones se toman entre los otros dos.',
  },
  'un-amigo-me-reemplazo-por-un-amigo-nuevo-y-aun-no-lo-he-supe': {
    description: 'Ahora suben stories juntos. Yo miro.',
  },
  'senti-celos-cuando-mi-mejor-amiga-empezo-a-quedar-con-otra': {
    description: 'No lo dije. Pero lo notó. Empeoró todo.',
  },
  'le-caigo-fatal-a-la-pareja-de-mi-mejor-amigo-y-lo-se': {
    description: 'En las cenas finge bien. En las fotos no tanto.',
  },
  'le-caen-mal-mis-amigos-a-mi-pareja-y-mis-amigos-lo-notan': {
    description: 'Los planes en grupo son un campo de minas.',
  },
  'falte-a-la-cena-de-mis-amigos-por-la-cena-de-los-amigos-de-m': {
    description: 'Elegí mal. Los míos se enteraron en stories.',
  },
  'tengo-un-amigo-que-cuenta-la-misma-anecdota-cada-vez-que-sal': {
    description: 'Nos sabemos los gestos. Reímos por inercia.',
  },
  'me-he-dado-cuenta-de-que-el-plomo-del-grupo-soy-yo': {
    description: 'Lo vi en una conversación que no debí leer.',
  },
  'soy-el-que-se-queja-siempre-del-bar-elegido': {
    description: 'Y siempre acabo pidiendo lo mismo en todos.',
  },
  'solte-un-analisis-futbolistico-delante-de-gente-que-no-me-ha': {
    description: 'Tres minutos de monólogo. Cero respuestas.',
  },
  'empece-una-frase-con-yo-es-que-soy-de-los-que-en-una-cena': {
    description: 'Y nadie me había preguntado nada.',
  },
  'monte-una-discusion-politica-en-una-cena-y-todos-se-incomoda': {
    description: 'Las cuñadas se miraron. Pedí la cuenta.',
  },
  'me-pegue-a-un-plan-al-que-tecnicamente-no-me-habian-invitado': {
    description: 'Aparecí "porque pillaba cerca". No pillaba.',
  },
  'apareci-en-una-cena-de-cinco-personas-siendo-el-sexto-sin-av': {
    description: 'La cocinera me odió de por vida.',
  },
  'dormi-en-una-habitacion-de-hotel-sin-pagarla-en-un-viaje-con': {
    description: 'Lo descubrieron al hacer cuentas. Pagué tarde.',
  },
  'vacaciones-con-amigos-arruinadas-por-discutir-quien-paga-que': {
    description: 'El Excel del viaje sigue sin cuadrar.',
  },
  'dormi-cuatro-personas-en-una-cama-doble-en-un-viaje': {
    description: 'Salimos con dolor de espalda y secretos compartidos.',
  },
  'me-pelee-con-un-amigo-por-la-temperatura-del-aire-acondicion': {
    description: 'Tres días sin hablarnos. Por dos grados.',
  },
  'me-mude-de-ciudad-y-mi-grupo-de-amigos-dejo-de-existir': {
    description: 'Sin pelea. Sin aviso. Solo silencio.',
  },
  'veo-las-stories-de-mi-mejor-amiga-y-eso-es-toda-nuestra-rela': {
    description: 'Sé qué desayuna. No sé cómo está.',
  },
  'quedamos-en-llamarnos-cada-semana-y-llevamos-un-ano-sin-habl': {
    description: 'La promesa se quedó en el WhatsApp.',
  },
  'me-encontre-con-un-excompanero-en-un-bar-y-fingimos-no-verno': {
    description: 'Los dos miramos el móvil con intensidad.',
  },
  'me-cruce-con-una-amiga-del-cole-y-nos-hicimos-las-locas': {
    description: 'Las dos sabíamos que la otra había visto.',
  },
  'cumpli-30-anos-sin-un-grupo-claro-de-amigos': {
    description: 'Lo celebré con dos compañeros de trabajo.',
  },
  'las-fiestas-del-pueblo-son-el-unico-momento-del-ano-que-teng': {
    description: 'Tres días intensos. Diez meses de WhatsApp muerto.',
  },
  'doy-likes-selectivos-a-las-publicaciones-de-mis-amigos-segun': {
    description: 'Hay un Excel mental de a quién le toca.',
  },
  'comento-guapooo-en-todas-las-fotos-de-un-amigo-y-en-las-de-o': {
    description: 'El otro me ha quitado los tags.',
  },
  'cambie-de-trabajo-y-nunca-mas-volvi-a-hablar-con-mis-amigos': {
    description: 'Eran amigos del café. No de la vida.',
  },
  'soy-amiga-de-mi-companero-solo-dentro-de-la-oficina': {
    description: 'Fuera no nos saludamos. Lo aceptamos.',
  },
  'una-amistad-paso-a-ser-solo-seguirnos-en-redes': {
    description: 'Nos damos like. No nos escribimos.',
  },
  'mi-grupo-del-instituto-se-disolvio-oficialmente-y-nadie-lo-d': {
    description: 'El último mensaje fue de 2019. Aún está ahí.',
  },
  'cena-de-reencuentro-con-amigos-del-cole-rara-y-forzada': {
    description: 'Hablamos de la ESO porque no había más temas.',
  },
  'mis-amigos-del-cole-hablan-de-una-vida-que-ya-no-es-la-mia': {
    description: 'Ellos en hipotecas. Yo en piso compartido a los 32.',
  },
  'monte-un-negocio-con-un-amigo-y-perdimos-los-dos-cosas': {
    description: 'El negocio cerró. La amistad también.',
  },
  'le-preste-500-euros-a-un-amigo-y-perdi-amigo-y-dinero': {
    description: 'Dos por el precio de uno.',
  },
  'soy-siempre-el-que-adelanta-el-dinero-en-las-cenas': {
    description: 'Y el último al que le devuelven los Bizums.',
  },
  'un-amigo-me-pidio-bizum-por-3-euros-de-unas-cervezas': {
    description: 'Con concepto: "tu parte". Tres. Euros.',
  },
  'soy-oficialmente-el-tacano-del-grupo-y-lo-asumo': {
    description: 'Reviso la cuenta tres veces antes de pagar.',
  },
  'no-me-invitaron-a-un-plan-y-senti-mas-alivio-que-pena': {
    description: 'Era miércoles. Tenía la cama hecha.',
  },
  'vi-fotos-en-instagram-del-plan-al-que-dije-que-no-podia-ir': {
    description: 'Los conté en la foto. Estaban todos.',
  },
  'dije-que-estaba-malo-y-me-quede-toda-la-tarde-en-la-cama-vie': {
    description: 'No mentía del todo. Estaba mentalmente malo.',
  },
  'invente-una-reunion-de-trabajo-para-no-ir-a-una-cena': {
    description: 'Un viernes a las 22h. Nadie me preguntó.',
  },
  'menti-diciendo-que-tenia-cena-con-la-familia-politica': {
    description: 'Excusa premium. Nadie pide explicaciones.',
  },
  'cancele-con-unos-amigos-para-quedar-con-otros-mas-interesant': {
    description: 'Los primeros lo notaron. Los segundos también.',
  },
  'dije-que-estaba-malo-y-luego-subi-stories-en-una-terraza': {
    description: 'Se me olvidó qué amigos seguían el grupo.',
  },
  'ignore-la-invitacion-de-cumple-y-deje-el-evento-en-visto': {
    description: 'Confirmé "tal vez". Acabó siendo un no.',
  },
  'llegue-tarde-con-una-excusa-que-ni-yo-me-creia': {
    description: 'Algo del metro. Algo del trabajo. Algo.',
  },
  'vi-la-llamada-de-mi-amiga-un-domingo-y-no-devolvi': {
    description: 'Ya van tres domingos. La cuarta no llamará.',
  },
  'quede-solo-para-que-mi-amiga-dejara-de-insistir': {
    description: 'Conté los minutos. Pagué la cuenta. Me fui.',
  },
  'llevo-seis-meses-sin-quedar-con-mi-mejor-amiga-y-aun-la-llam': {
    description: 'Por costumbre. Por nostalgia. Por inercia.',
  },
  'llevamos-un-ano-diciendonos-tenemos-que-quedar-a-tomar-algo': {
    description: 'Cada vez que nos vemos, lo decimos otra vez.',
  },
  'soy-siempre-yo-el-que-propone-planes-y-un-dia-deje-de-hacerl': {
    description: 'Pasaron tres meses. Nadie escribió.',
  },
  'deje-de-proponer-planes-y-descubri-que-nadie-proponia': {
    description: 'El silencio del grupo era ensordecedor.',
  },
  'bloquee-las-stories-a-una-amiga-sin-que-ella-lo-supiera': {
    description: 'Llevo dos años así. Nunca lo notará.',
  },
  'elimine-fotos-con-un-grupo-de-amigos-del-que-ya-no-formo-par': {
    description: 'Sesión de medianoche. Sin remordimientos.',
  },
  'perdi-una-amistad-cuando-me-eche-pareja': {
    description: 'No fue culpa de la pareja. O sí. Un poco.',
  },
  'mi-pareja-me-ha-aislado-de-mis-amigos-y-solo-me-doy-cuenta-a': {
    description: 'Me lo dijo otra amiga. Me costó verlo.',
  },
  'soy-el-unico-soltero-del-grupo-y-odio-cuando-hablan-de-hipot': {
    description: 'Asiento. No tengo nada que aportar.',
  },
  'un-amigo-fue-padre-y-deje-de-entender-de-que-hablaba': {
    description: 'Las anécdotas pasaron a ser de papillas.',
  },
  'aguante-una-cena-entera-oyendo-hablar-de-hipotecas-y-guarder': {
    description: 'Yo seguía en alquiler. Sin hijos. Sin saber qué decir.',
  },
  'mis-nuevos-amigos-son-los-amigos-de-mi-pareja': {
    description: 'Heredados. Pero auténticos. Casi.',
  },
  'tengo-mas-relacion-con-los-amigos-de-mi-pareja-que-con-los-m': {
    description: 'Y eso me preocupa más de lo que admito.',
  },
  'confirme-asistencia-y-al-final-no-apareci-sin-avisar': {
    description: 'Tres ghostings así. La cuarta no me invitó.',
  },
  'no-fui-al-cumple-no-felicite-no-di-senales': {
    description: 'Lo justifiqué con "se me pasó". Mentira.',
  },
  'me-invitaron-a-un-bautizo-y-no-sabia-que-hacer-ahi': {
    description: 'Llevaba veinte años sin pisar una iglesia.',
  },
  'no-fui-al-funeral-del-padre-de-un-amigo-y-aun-me-arrepiento': {
    description: 'Pasaron cinco años. Sigue sin perdonarme.',
  },
  'no-supe-que-decirle-a-un-amigo-cuando-perdio-a-alguien': {
    description: 'Le mandé un emoji. Me odio por eso.',
  },
  'le-puse-mucho-animo-en-facebook-y-me-senti-fatal': {
    description: 'Tres palabras. En público. Sin llamarle.',
  },
  'mantengo-la-amistad-solo-a-base-de-likes': {
    description: 'Sin texto. Sin llamadas. Solo el corazón rojo.',
  },
  'stalkee-el-tfg-de-un-excompanero-solo-por-curiosidad-morbosa': {
    description: 'Ochenta páginas. Las leí todas.',
  },
  'stalkeo-cada-nueva-pareja-de-mi-mejor-amiga-durante-una-hora': {
    description: 'Le doy mi veredicto sin que me lo pida.',
  },
  'hago-las-stories-solo-para-ver-quien-esta-con-quien': {
    description: 'Cero fotos mías. Mucho zoom en las suyas.',
  },
  'tengo-un-grupo-paralelo-donde-criticamos-al-grupo-principal': {
    description: 'Está silenciado el principal. Activo el otro.',
  },
  'estoy-en-un-grupo-de-whatsapp-donde-criticamos-a-una-persona': {
    description: 'Sigue en el grupo grande. Ríe nuestras bromas.',
  },
  'saque-a-colacion-un-tema-en-una-cena-para-criticar-a-alguien': {
    description: 'Se notó el guion. Nadie lo siguió.',
  },
  'hice-de-mediadora-entre-dos-amigas-que-se-odiaban-y-acabe-pe': {
    description: 'Ahora me odian las dos. Doble.',
  },
  'tuve-que-tomar-partido-en-una-pelea-de-amigos-y-elegi-mal': {
    description: 'El otro hizo las paces. Yo me quedé fuera.',
  },
  'no-defendi-a-un-amigo-cuando-hablaban-mal-de-el-en-una-cena': {
    description: 'Mantuve el silencio. Lo asumí como neutral.',
  },
  'rei-una-broma-de-un-amigo-aunque-me-parecio-hiriente': {
    description: 'La risa fue cobardía. Lo sabíamos los dos.',
  },
  'hice-una-broma-que-dolio-a-un-amigo-y-segui-como-si-nada': {
    description: 'Lo vi en su cara. No paré de reír.',
  },
  'me-pidio-perdon-y-dije-tranqui-no-pasa-nada-pero-si-pasaba': {
    description: 'Sigue pasando. No se lo he dicho.',
  },
  'llevo-anos-aguantando-rencor-a-una-amiga-sin-que-lo-sepa': {
    description: 'Cada vez que escribe me acuerdo de qué.',
  },
  'corte-una-amistad-de-10-anos-con-un-mensaje-de-whatsapp': {
    description: 'Borrador 1: tres páginas. Final: tres líneas.',
  },
  'acabe-una-amistad-por-desgaste-sin-decir-nada': {
    description: 'Sin pelea. Solo dejé de responder.',
  },
  'mi-mejor-amigo-del-instituto-es-ahora-literalmente-un-descon': {
    description: 'Vi su cumple en Facebook. No felicité.',
  },
  'vi-una-foto-vieja-con-mi-exmejor-amiga-y-llore': {
    description: 'No la borré. La cerré rápido.',
  },
  'borre-el-numero-de-un-amigo-en-un-arrebato': {
    description: 'A los dos meses lo busqué. Ya no estaba en mi vida.',
  },
  'bloquee-y-desbloquee-a-un-amigo-en-menos-de-una-hora': {
    description: 'Quería que lo notara. No lo notó.',
  },
  'stalkeo-a-un-amigo-con-el-que-ya-no-hablo-cada-dos-por-tres': {
    description: 'Sé qué desayunó esta mañana.',
  },
  'tengo-una-cuenta-secundaria-solo-para-ver-perfiles-de-excomp': {
    description: 'Cero seguidores. Cero contenido. Solo missión.',
  },
  'vi-una-peli-sobre-amigos-y-me-deprimi-pensando-en-los-mios': {
    description: 'Era una comedia. No me reí.',
  },
  'llegue-a-los-30-con-muchas-amistades-superficiales-y-pocas-r': {
    description: 'Cuento 200 contactos. Llamaría a dos en una crisis.',
  },
  'pase-un-fin-de-semana-entero-sin-hablar-con-nadie-y-nadie-lo': {
    description: 'Ni un mensaje. Ni una llamada. Ni un like.',
  },
  'quedaron-y-se-entere-por-casualidad-por-una-historia': {
    description: 'Pregunté en privado. Me dijeron "pensábamos que no podías".',
  },
  'hicieron-un-grupo-mas-pequeno-dentro-del-grupo-y-no-me-invit': {
    description: 'Lo descubrí cuando alguien lo nombró delante de mí.',
  },
  'mi-cumpleanos-fueron-tres-personas-y-me-hice-el-feliz': {
    description: 'Dos eran de mi pareja. La tercera mi madre.',
  },
  'tuve-que-organizar-mi-propio-cumpleanos-porque-nadie-iba-a-h': {
    description: 'Reservé el sitio. Mandé las invitaciones. Pagué.',
  },
  'prepare-un-discurso-para-una-cena-de-amigos-y-lo-solte-con-v': {
    description: 'Aplaudieron por compromiso. No volví a soltar discursos.',
  },
  'me-puse-pesadisimo-en-un-bar-diciendo-a-mis-amigos-cuanto-le': {
    description: 'A las tres copas. Lloré un poco.',
  },
  'llore-en-un-bar-con-un-amigo-y-a-la-manana-siguiente-ninguno': {
    description: 'Hicimos como si no hubiera pasado.',
  },
  'le-conte-algo-intimo-a-un-amigo-borracho-y-al-dia-siguiente': {
    description: 'Esperaba que no lo recordara. Lo recordaba.',
  },
  'cante-cumpleanos-feliz-a-una-amiga-por-nota-de-voz-desafinan': {
    description: 'Lo escuchó tres veces. Me lo dijo.',
  },
  'mande-feliz-cumple-sin-emojis-a-una-persona-muy-importante': {
    description: 'Sin signos de exclamación. Sin gif. Frialdad pura.',
  },
  'solo-me-felicitaron-por-el-grupo-de-la-familia-y-no-por-el-d': {
    description: 'Refresqué la app cada hora. Nada.',
  },
  'le-pedi-perdon-a-una-amiga-seis-anos-despues-por-algo-que-el': {
    description: 'Me dijo "¿qué?". No se acordaba.',
  },
  'no-fui-a-la-despedida-de-soltera-y-le-envie-regalo-de-amazon': {
    description: 'Con tarjeta automática. "Disfrútalo, guapa".',
  },
  'llore-en-la-despedida-del-piso-de-mis-amigas-como-si-no-nos': {
    description: 'Vivían a 40 minutos. No nos hemos visto en 8 meses.',
  },
  'prometi-ayudar-en-una-mudanza-y-nunca-apareci': {
    description: 'Mensaje de la mañana: "se me ha jodido la espalda".',
  },
  'dije-que-ayudaba-con-la-mudanza-y-le-di-excusa-esa-misma-man': {
    description: 'A las 9:01 ya tenía la excusa preparada.',
  },
  'mi-mejor-amigo-se-mudo-hace-dos-anos-y-aun-no-he-ido-a-su-ca': {
    description: 'Cada vez que me invita digo "este mes seguro".',
  },
  'mi-amiga-lleva-tres-anos-en-otra-ciudad-y-no-la-he-visitado': {
    description: 'Está a dos horas en AVE. La distancia es excusa.',
  },
  'volvio-de-erasmus-y-nuestra-amistad-ya-no-era-igual': {
    description: 'Ella había vivido cosas. Yo seguía igual.',
  },
  'mi-grupo-de-erasmus-es-ya-solo-gente-que-no-vere-nunca-mas': {
    description: 'Cien fotos juntos. Cero llamadas en cinco años.',
  },
  'solo-nos-recordamos-por-una-foto-vieja-de-erasmus-en-anivers': {
    description: 'Cada año la sube alguien. Likes. Silencio.',
  },
  'mi-grupo-de-la-uni-se-disolvio-cuando-uno-se-hizo-papa': {
    description: 'Era el que organizaba todo. Ahora cambia pañales.',
  },
  'he-cambiado-de-grupo-de-amigos-como-tres-veces-en-mi-vida': {
    description: 'Cole, uni, trabajo. Cada uno tiene caducidad.',
  },
  'conozco-a-mucha-gente-y-no-se-si-tengo-un-amigo-de-verdad': {
    description: 'A las 3am no sé a quién llamaría.',
  },
  'a-los-30-conoci-a-alguien-con-quien-hice-amistad-de-verdad': {
    description: 'Tarde, dicen. Justo a tiempo, digo yo.',
  },
  'hice-una-amiga-en-una-clase-de-yoga-a-los-28': {
    description: 'Más amistad que con la gente del cole.',
  },
  'mi-grupo-mas-fuerte-se-formo-pasados-los-25': {
    description: 'Sin sangre. Sin años. Solo elección.',
  },
  'le-preste-una-camiseta-a-un-amigo-y-nunca-volvio': {
    description: 'La he visto en dos fotos suyas. Sin reclamar.',
  },
  'preste-un-libro-y-desde-entonces-se-que-no-lo-voy-a-recupera': {
    description: 'Lo doy por donado.',
  },
  'le-di-un-taper-a-una-amiga-y-han-pasado-dos-anos': {
    description: 'Era de mi madre. La sigo evitando.',
  },
  'le-preste-la-ps5-a-un-amigo-seis-meses': {
    description: 'Salieron tres juegos nuevos en ese tiempo.',
  },
  'dije-una-mas-y-a-casa-y-acabe-a-las-7-con-mi-mejor-amigo': {
    description: 'La una más fueron seis. Llegamos al amanecer.',
  },
  'perdi-las-llaves-del-piso-volviendo-de-fiesta-con-mis-amigos': {
    description: 'Dormí en el portal hasta las 8.',
  },
  'mi-amigo-me-llevo-a-casa-cargado-de-borracho-y-nunca-lo-agra': {
    description: 'No lo recuerdo. Él lo cuenta cada vez.',
  },
  'sostuve-el-pelo-a-una-amiga-vomitando-y-nos-hicimos-intimas': {
    description: 'Se forjan amistades en el baño de la disco.',
  },
  'hice-mejor-amiga-del-bar-en-el-bano-de-una-discoteca': {
    description: 'Compartimos pintalabios. Y secretos.',
  },
  'la-mejor-amiga-del-bar-no-volvi-a-verla-en-mi-vida': {
    description: 'Nos seguimos en Instagram. Nada más.',
  },
  'pague-el-uber-del-amigo-borracho-y-nunca-me-lo-bizumeo': {
    description: 'Han pasado siete meses. Lo doy por perdido.',
  },
  'atendi-una-llamada-de-un-amigo-a-las-3am-llorando-y-le-ayude': {
    description: 'Tres horas al teléfono. Al día siguiente al curro.',
  },
  'vi-una-llamada-perdida-a-las-3am-de-un-amigo-y-no-devolvi': {
    description: 'Al día siguiente le pregunté qué tal. Mintió.',
  },
  'aguante-tres-horas-de-whatsapp-a-una-amiga-rota-tras-una-rup': {
    description: 'Le di los mismos consejos que la última vez.',
  },
  'conte-el-mismo-drama-mio-a-tres-amigos-distintos': {
    description: 'Cada uno me dio una opinión distinta. Hice la mía.',
  },
  'fingi-escuchar-a-una-amiga-mientras-pensaba-en-mis-cosas': {
    description: 'Asentí en los momentos correctos. Creo.',
  },
  'asenti-mucho-rato-sin-entender-de-que-iba-la-conversacion': {
    description: 'Cuando me pidieron opinión, busqué baño rápido.',
  },
  'mi-amigo-alarga-las-cenas-hasta-las-2am-cuando-yo-solo-queri': {
    description: 'Pido la cuenta cuatro veces. Él pide otra ronda.',
  },
  'fingi-una-llamada-para-irme-antes-de-una-cena': {
    description: 'Pantalla en negro. Hablé sola dos minutos.',
  },
  'me-fui-a-la-francesa-de-una-fiesta-con-amigos': {
    description: 'Sin abrazos. Sin avisos. Sin culpa.',
  },
  'una-amiga-me-trato-mal-toda-la-noche-y-no-dije-nada': {
    description: 'Me lo callé. Le sigo escribiendo.',
  },
  'en-el-grupo-siempre-acabo-aceptando-el-plan-que-no-quiero': {
    description: 'Me toca el bar más caro. Me toca el martes.',
  },
  'dije-que-todo-estaba-bien-y-luego-me-fui-llorando-al-bano': {
    description: 'Volví con la cara lavada. Sonreí.',
  },
  'mi-mejor-amistad-se-basa-en-trauma-compartido': {
    description: 'No sabríamos hablar de otra cosa.',
  },
  'mi-amiga-y-yo-nos-contamos-que-pastilla-tomamos': {
    description: 'Sin filtros. Con dosis exactas.',
  },
  'llore-viendo-una-foto-vieja-del-grupo-en-la-galeria': {
    description: 'Eran las vacaciones de 2018. Ya no quedan los siete.',
  },
  'busque-fotos-antiguas-para-recordar-que-tenia-amigos': {
    description: 'Encontré 400. Confirmé que sí, los tuve.',
  },
  'relei-conversaciones-viejas-con-un-amigo-con-el-que-ya-no-ha': {
    description: 'Tres horas leyendo. No le escribí.',
  },
  'mi-mejor-ano-fue-uno-con-un-grupo-que-ya-no-existe': {
    description: 'Y nunca volverá a serlo.',
  },
  'cuando-se-echo-pareja-la-perdi-casi-del-todo': {
    description: 'Su pareja era simpática. Ese era el problema.',
  },
  'quede-con-una-amiga-despues-de-dos-anos-y-fue-una-peli': {
    description: 'Tres horas hablando como si fueran tres días.',
  },
  'soy-el-unico-del-grupo-que-sigue-viviendo-en-el-barrio': {
    description: 'Los demás me visitan. Una vez al año.',
  },
  'mi-grupo-se-disolvio-cuando-dejamos-el-piso-compartido': {
    description: 'Sin la cocina común no quedaba nada.',
  },
  'quise-matar-a-mi-mejor-amiga-viviendo-juntas': {
    description: 'Dejábamos los platos como armas.',
  },
  'estuve-un-mes-sin-hablar-con-mi-companera-de-piso-por-los-pl': {
    description: 'Comunicábamos por post-it. Pasivo-agresivo nivel max.',
  },
  'deje-un-post-it-pasivo-agresivo-a-mi-amiga-compi-de-piso': {
    description: 'Tres palabras subrayadas. Y un emoji.',
  },
  'en-mi-piso-compartido-los-bizum-eran-un-infierno': {
    description: 'Cuentas mensuales tipo cárcel.',
  },
  'dormi-en-el-sofa-de-un-amigo-cuatro-meses': {
    description: 'Llevaba una bolsa. Me quedé un trimestre.',
  },
  'acogi-a-un-amigo-en-mi-casa-cuando-rompio-con-su-pareja': {
    description: 'Dijo "una semana". Llevamos tres.',
  },
  'tuve-la-llave-de-la-casa-de-tres-amigas-y-la-perdi-en-alguna': {
    description: 'Cambiaron el bombín. No me lo dijeron.',
  },
  'junte-a-dos-amigos-como-pareja-y-luego-rompieron-y-todo-fue': {
    description: 'Me culparon los dos. Independientemente.',
  },
  'tuve-un-rollo-con-un-amigo-del-grupo-y-todos-lo-notaron': {
    description: 'Negamos en grupo. Nadie nos creyó.',
  },
  'tuve-un-rollo-con-la-mejor-amiga-de-mi-mejor-amiga-y-nunca-l': {
    description: 'Me lo llevaré a la tumba. O no.',
  },
  'tuve-celos-cuando-mi-amiga-se-hizo-intima-de-otra': {
    description: 'No lo dije. Lo notó. Empeoró todo.',
  },
  'tengo-una-amistad-chico-chica-que-vive-de-tension-sexual-no': {
    description: 'Llevamos diez años. Y dos parejas cada uno.',
  },
  'una-noche-con-un-amigo-arruino-la-amistad-para-siempre': {
    description: 'Cinco minutos. Diez años a la basura.',
  },
  'mi-amiga-se-lio-con-un-amigo-mio-y-se-incomodo-todo': {
    description: 'Las cenas en grupo se acabaron.',
  },
  'una-pareja-de-amigos-del-grupo-corto-y-nos-dividieron': {
    description: 'Bandos no oficiales. Pero todos sabíamos.',
  },
  'tuve-que-elegir-bando-en-la-ruptura-de-dos-amigos-y-elegi-ma': {
    description: 'El otro perdonó. Yo no fui invitada.',
  },
  'vi-una-foto-del-grupo-y-note-que-faltaba-alguien-que-ya-no-e': {
    description: 'Nadie lo nombró. Todos lo pensamos.',
  },
  'en-mi-cumple-alguien-hizo-foto-y-mi-mejor-amigo-no-estaba': {
    description: 'No vino. No avisó. No felicitó.',
  },
  'no-tengo-una-foto-reciente-con-un-solo-amigo-de-verdad': {
    description: 'La galería son selfies y memes.',
  },
  'adelante-la-cuenta-de-la-cena-y-el-que-faltaba-nunca-pago': {
    description: 'Era el más rico del grupo. No lo era de espíritu.',
  },
  'en-mi-cumple-de-30-vinieron-mas-amigos-de-mi-pareja-que-mios': {
    description: 'Conté las caras. Hice el cálculo. Lloré por la noche.',
  },
  'llamo-a-mi-madre-antes-que-a-un-amigo-cuando-me-pasa-algo-bu': {
    description: 'Y a mis amigos no les llamo nunca primero.',
  },
  'me-paso-algo-bueno-y-no-se-lo-conte-a-nadie-por-pereza': {
    description: 'Lo celebré sola. Estuvo bien también.',
  },
  'tengo-un-mensaje-sin-leer-de-un-amigo-desde-hace-tres-semana': {
    description: 'Sé que pone "qué tal estás". No abro.',
  },
  'respondo-siempre-con-tres-palabras-a-mi-amiga-que-escribe-no': {
    description: '"Total amiga total". Repetido.',
  },
  'recibo-audios-de-mi-amiga-y-los-oigo-en-x2-sin-atencion': {
    description: 'Capto palabras sueltas. Respondo en consecuencia.',
  },
  'transcribo-los-audios-de-mi-amiga-porque-me-da-pereza-escuch': {
    description: 'WhatsApp ahora lo hace. Bendita IA.',
  },
  'leo-los-mensajes-del-grupo-desde-la-cuenta-de-mi-pareja': {
    description: 'Para no marcar visto. Nivel pro.',
  },
  'mi-pareja-conoce-a-mis-amigos-solo-por-lo-que-cuento-del-gru': {
    description: 'Tiene su propia opinión sobre cada uno. Sin haberlos visto.',
  },
  'despues-de-cada-cena-con-amigos-hago-debrief-con-mi-pareja-u': {
    description: 'Diseccionamos cada frase. Cada gesto. Cada silencio.',
  },
  'le-conte-a-mi-pareja-un-secreto-que-un-amigo-me-habia-confia': {
    description: 'Me lo había hecho prometer. Prometí.',
  },
  'toda-la-pandilla-cambio-la-foto-de-perfil-al-grupo-en-una-bo': {
    description: 'Yo no me enteré. Quedé como rara.',
  },
  'mi-grupo-tuvo-una-epoca-en-la-que-todos-teniamos-la-misma-fo': {
    description: 'Era 2014. Aún la conservamos algunas.',
  },
  'mi-grupo-me-puso-un-mote-y-no-me-he-atrevido-a-decir-que-lo': {
    description: 'Llevo respondiendo a él 12 años.',
  },
  'llevo-veinte-anos-respondiendo-a-un-mote-del-cole': {
    description: 'Mi nombre real lo dice solo mi madre.',
  },
  'tuve-que-explicarle-una-broma-interna-del-grupo-a-un-nuevo-y': {
    description: 'Todo perdió la gracia al traducirla.',
  },
  'mis-amigos-hicieron-una-broma-interna-que-no-pille-y-me-sent': {
    description: 'Reí por compromiso. Me sentí turista.',
  },
  'llegue-tarde-a-una-comida-y-todos-comieron-sin-mi': {
    description: 'Los platos vacíos. La cuenta pedida.',
  },
  'llegue-la-ultima-a-mi-propio-cumpleanos': {
    description: 'Confundí la hora que yo había puesto.',
  },
  'soy-el-pesado-del-escape-room-cuando-voy-con-amigos': {
    description: 'Lo organizo. Lo planifico. No me dejan tocar nada.',
  },
  'hago-trampas-en-juegos-de-mesa-con-amigos-y-lo-niego': {
    description: 'Cambié las cartas dos veces. Gané convincentemente.',
  },
  'sali-del-bar-sin-avisar-y-mis-amigos-me-buscaron-una-hora': {
    description: 'Llegué a casa. Vi 17 llamadas perdidas.',
  },
  'perdi-a-mis-amigos-en-un-festival-y-volvi-solo-al-hostel': {
    description: 'Sin batería. Sin rumbo. Volví guiándome por las luces.',
  },
  'despues-del-festival-con-mis-amigos-nada-volvio-a-ser-igual': {
    description: 'Pasaron tres días. Pasamos cinco etapas del duelo.',
  },
  'me-fui-de-vacas-con-un-grupo-y-nunca-volvere-a-ir': {
    description: 'El primer día ya quería volverme.',
  },
  'cancele-en-el-grupo-y-silencie-notificaciones-para-no-leer-l': {
    description: 'Sé que están escribiéndome. No quiero saber qué.',
  },
  'la-amistad-acabo-sin-pelea-solo-se-diluyo': {
    description: 'Sin último mensaje. Sin último plan. Sin nada.',
  },

  // ===== v3-relaciones (200) ============================================
  'stalkee-el-instagram-de-mi-ex-a-las-3-de-la-manana-en-modo-i': {
    description: 'Llegué al 2017. Le di like sin querer. Cerré la app.',
  },
  'le-di-like-sin-querer-a-una-foto-de-mi-ex-de-2018': {
    description: 'Lo retiré en cuatro segundos. Ya lo había visto.',
  },
  'le-di-swipe-a-la-derecha-a-un-companero-de-trabajo-en-tinder': {
    description: 'Match. Lunes en la oficina. Ninguno mencionó nada.',
  },
  'hice-match-con-mi-jefe-en-tinder': {
    description: 'Cerré la app. Borré la cuenta. Cambié de empresa.',
  },
  'vi-el-perfil-de-mi-ex-en-bumble-y-cerre-la-app-del-susto': {
    description: 'No le di unmatch. La cerré. Volví. Sigue ahí.',
  },
  'cancele-una-cita-de-tinder-a-10-minutos-de-quedar-sin-excusa': {
    description: 'Le mandé "perdona, no me siento bien". Era mentira.',
  },
  'llegue-borracho-a-la-primera-cita-y-la-lie-parda': {
    description: 'No hubo segunda. La primera ya fue suficiente.',
  },
  'vomite-en-la-primera-cita-y-aun-asi-hubo-segunda': {
    description: 'Le pareció tierno. Llevamos dos años.',
  },
  'llame-a-mi-cita-por-el-nombre-de-mi-ex': {
    description: 'Lo dijo el camarero también. Por error o por venganza.',
  },
  'cite-a-dos-personas-la-misma-noche-en-bares-distintos': {
    description: 'A 200 metros entre uno y otro. Sin levantar sospechas.',
  },
  'le-hice-ghosting-a-alguien-despues-de-tres-meses': {
    description: 'Sin previo aviso. Sin explicación. Sigo viendo sus stories.',
  },
  'recibi-ghosting-de-alguien-con-quien-llevaba-siete-meses': {
    description: 'Pasaron de los te quiero al silencio. Sin tránsito.',
  },
  'respondi-un-mensaje-de-hinge-un-mes-despues-como-si-nada': {
    description: 'Empezando con "perdona, super liada". Mentí.',
  },
  'hice-breadcrumbing-a-alguien-durante-medio-ano': {
    description: 'Una migaja por semana. Suficiente para que no se fuera.',
  },
  'dije-estoy-muy-liado-para-no-quedar-y-vio-que-estaba-en-twit': {
    description: 'Mi último tuit fue cinco minutos después.',
  },
  'quede-con-mi-ex-jurando-que-solo-era-un-cafe': {
    description: 'Salimos a las seis horas de su casa.',
  },
  'folle-con-mi-ex-en-lo-que-habria-sido-nuestro-aniversario': {
    description: 'Fue mejor que cuando estábamos juntos.',
  },
  'vi-las-stories-de-mi-ex-cinco-veces-el-mismo-dia': {
    description: 'Cada vez que actualizaba la app. Cada hora.',
  },
  'me-hice-una-cuenta-falsa-solo-para-stalkear-a-mi-ex': {
    description: 'Sin foto. Sin seguidores. Solo missión.',
  },
  'mande-screenshots-de-mi-ex-al-grupo-de-amigas-para-analisis': {
    description: 'Diseccionamos cada coma. Tres horas. Cero conclusiones.',
  },
  'stalkee-hasta-el-linkedin-de-la-nueva-pareja-de-mi-ex': {
    description: 'Le di skill endorsement por accidente.',
  },
  'mire-el-movil-de-mi-pareja-mientras-dormia': {
    description: 'No encontré nada. Tampoco lo busqué.',
  },
  'tuve-celos-del-amigo-del-trabajo-de-mi-pareja': {
    description: 'No le había visto la cara. Solo el nombre en stories.',
  },
  'revise-a-quien-daba-likes-mi-pareja-en-instagram': {
    description: 'Tres por hora. Anoté patrones. Sospeché de una.',
  },
  'pregunte-quien-es-esa-de-la-foto-y-monte-un-drama-de-hora-y': {
    description: 'Era su prima. Nadie tuvo razón.',
  },
  'mantuve-una-relacion-a-distancia-tres-meses-sin-vernos': {
    description: 'Cuando nos vimos no había nada que decir.',
  },
  'hice-una-videollamada-de-siete-horas-con-mi-pareja-a-distanc': {
    description: 'Cuatro de silencio cómodo. Tres incómodo.',
  },
  'deje-de-hablarle-a-mi-pareja-a-distancia-sin-avisar': {
    description: 'A 1.500 km. Tres días sin señales. Lo asumió.',
  },
  'estuve-un-ano-en-una-situationship-sin-etiquetar-nada': {
    description: 'Cuando le pregunté "qué somos" se acabó.',
  },
  'solte-el-clasico-estamos-viendo-que-pasa': {
    description: 'Llevamos así año y medio. Seguimos viendo.',
  },
  'presente-a-mi-situationship-a-mis-amigos-como-mi-amigo': {
    description: 'Él lo aceptó. Luego me lo recordó cada borrachera.',
  },
  'tuve-un-amigo-con-derecho-a-roce-durante-medio-ano': {
    description: 'Ni amigo ni roce. Solo whatsapps a las 11pm.',
  },
  'deje-de-hablarme-con-un-amigo-despues-de-follar-una-vez': {
    description: 'Cinco años de amistad. Una noche para acabar con todo.',
  },
  'tuve-la-conversacion-de-ruptura-en-un-restaurante-lleno-de-g': {
    description: 'La mesa de al lado pidió la cuenta antes que nosotros.',
  },
  'llore-una-hora-seguida-en-el-bano-despues-de-cortar': {
    description: 'En el suelo. Con ropa puesta. Sin entender por qué.',
  },
  'bloquee-a-mi-ex-en-todas-las-redes-en-menos-de-cinco-minutos': {
    description: 'WhatsApp. Insta. Twitter. Spotify. Strava. LinkedIn.',
  },
  'desbloquee-a-mi-ex-tres-dias-despues-porque-pude': {
    description: 'No vi nada. Volví a bloquear. Otra vez.',
  },
  'corte-con-mi-pareja-por-whatsapp-despues-de-dos-anos': {
    description: 'Doce mensajes redactados. Mandé el más corto.',
  },
  'me-cortaron-por-un-audio-de-whatsapp-de-doce-minutos': {
    description: 'No lo escuché entero. Sabía cómo acababa.',
  },
  'llevo-con-mi-pareja-anos-y-ya-no-follamos-casi-nunca': {
    description: 'Lo justificamos con cansancio. Llevamos así dos años.',
  },
  'mi-pareja-y-yo-dormimos-mirando-a-lados-opuestos-cada-noche': {
    description: 'No fue un día concreto. Pasó.',
  },
  'cenamos-cada-noche-con-mi-pareja-mirando-el-movil': {
    description: 'Hablamos por whatsapp del mismo sofá.',
  },
  'llevamos-cinco-anos-haciendo-el-mismo-plan-de-domingo': {
    description: 'El mismo bar. La misma hora. La misma conversación.',
  },
  'tuve-un-rebote-a-las-dos-semanas-de-cortar': {
    description: 'No funcionó. Yo seguía pensando en el otro.',
  },
  'dije-te-quiero-en-la-tercera-cita-y-se-asusto': {
    description: 'Me cogió la mano. No respondió. Pidió la cuenta.',
  },
  'tuve-una-pelea-con-mi-pareja-delante-de-sus-padres-la-primer': {
    description: 'Nos miraron. Siguieron comiendo. No volvimos.',
  },
  'mi-suegra-me-pregunto-cuando-nos-casamos-a-la-segunda-comida': {
    description: 'Tras el postre. Sin filtros. Sin avisos.',
  },
  'monte-una-bronca-porque-mi-pareja-me-dejo-en-visto-cuatro-ho': {
    description: 'Estaba en el médico. Yo no escuché. Lloré dos veces.',
  },
  'discutimos-media-hora-porque-no-decidiamos-donde-cenar': {
    description: 'Cenamos cereales en casa. Sin hablar.',
  },
  'mi-pareja-vio-un-partido-de-futbol-el-dia-de-nuestro-anivers': {
    description: 'Empate. Y aniversario olvidado. Doble derrota.',
  },
  'olvide-nuestro-aniversario-y-me-entere-por-su-story': {
    description: 'Subió una foto vieja con "tres años". Pánico inmediato.',
  },
  'le-regale-a-mi-pareja-una-cubitera-por-su-cumpleanos': {
    description: 'No fue ironía. No fue indirecta. Solo pereza.',
  },
  'compare-mi-aniversario-con-los-de-instagram-y-me-deprimi': {
    description: 'Cenamos en un Foster Hollywood. Sin filtro.',
  },
  'vivo-con-mi-pareja-y-nos-peleamos-por-el-orden-del-bano': {
    description: 'Cada uno tiene su lado del lavabo. No se cruzan.',
  },
  'tuvimos-una-pelea-epica-por-quien-saca-la-basura': {
    description: 'Acabó con cada uno bajando media bolsa.',
  },
  'bloquee-y-desbloquee-a-mi-ex-diez-veces-en-una-semana': {
    description: 'Era control de impulsos. No funcionaba.',
  },
  'tuve-un-crush-en-clase-y-solo-le-mire-durante-un-cuatrimestr': {
    description: 'Cuatro meses sin dirigirle la palabra. Suspendí cálculo.',
  },
  'mi-crush-me-dejo-un-mensaje-sin-leer-durante-un-mes': {
    description: 'Lo leyó después. Respondió "hola". Me hundí.',
  },
  'puse-los-cuernos-en-una-boda-con-la-prima-del-novio': {
    description: 'En el baño. Durante el banquete. Nadie lo supo.',
  },
  'me-pusieron-los-cuernos-con-mi-mejor-amigo': {
    description: 'Perdí dos personas en un día. Doble luto.',
  },
  'sospeche-que-me-ponian-los-cuernos-durante-tres-meses': {
    description: 'Acabé teniendo razón. Hubiera preferido no tenerla.',
  },
  'solte-una-frase-de-ligar-tan-mala-que-se-rio-en-mi-cara': {
    description: 'Nos casamos cinco años después.',
  },
  'pedi-bizum-a-mi-cita-por-la-mitad-de-la-cuenta': {
    description: 'Concepto: "cena". Tres euros con sesenta. No hubo segunda.',
  },
  'mande-un-mensaje-a-mi-ex-a-las-3am-estando-borracho-perdido': {
    description: 'Lo borré por la mañana. Ya lo había leído.',
  },
  'folle-con-quien-no-debia-estando-borracho': {
    description: 'No me lo perdoné. Tampoco lo conté.',
  },
  'me-desperte-en-la-cama-de-un-desconocido-sin-saber-ni-el-nom': {
    description: 'Lo busqué en su DNI sobre la cómoda.',
  },
  'sali-de-su-casa-de-puntillas-al-amanecer-sin-despedirme': {
    description: 'Le robé un café para llevar. Lo siento.',
  },
  'me-duche-en-casa-de-alguien-que-acababa-de-conocer': {
    description: 'Su gel olía raro. Salí oliendo a su abuela.',
  },
  'ligue-por-dms-de-instagram-y-acabamos-saliendo-ano-y-medio': {
    description: 'El primer mensaje fue un emoji de fueguito.',
  },
  'tire-ficha-por-linkedin-y-se-lo-tomo-como-spam-profesional': {
    description: 'Me respondió con "estoy abierta a oportunidades".',
  },
  'ligue-con-alguien-en-el-gimnasio-y-ahora-le-evito-como-a-la': {
    description: 'Cambié de horario. Cambié de gimnasio.',
  },
  'dije-no-a-una-pedida-de-mano-en-un-restaurante-lleno': {
    description: 'Aplaudieron antes de mi respuesta. Ya era tarde.',
  },
  'improvise-un-anillo-con-la-anilla-de-una-lata-para-pedirle-m': {
    description: 'Dijo que sí. Sigue puesto el de la lata.',
  },
  'vi-el-compromiso-de-mi-ex-en-instagram-el-mismo-dia-que-lo-s': {
    description: 'Le di like al carrusel. No al primer slide.',
  },
  'fingi-que-me-caia-bien-mi-suegra-durante-cuatro-navidades-se': {
    description: 'Le pregunté por su gato. Cada año. Otro tema.',
  },
  'mi-cunada-me-odia-desde-la-primera-comida-y-nadie-sabe-por-q': {
    description: 'Mi pareja no defiende. Lo asume.',
  },
  'mi-suegro-lleva-llamandome-por-otro-nombre-cinco-anos': {
    description: 'Empezamos con Marta. Vamos por María. Acepto.',
  },
  'hice-match-con-la-prima-de-mi-mejor-amigo-en-tinder': {
    description: 'Le di unmatch antes de leer mensajes. No se lo dije a él.',
  },
  'vi-a-la-pareja-de-mi-amigo-en-tinder-swipeando-activamente': {
    description: 'Tres screenshots. Cero entrega.',
  },
  'me-cogieron-stalkeando-porque-le-di-like-sin-querer-a-algo-d': {
    description: 'Me bloquearon en cuatro plataformas en seis minutos.',
  },
  'cocine-paella-para-impresionar-y-salio-un-arroz-quemado': {
    description: 'Pedimos un Glovo. Se acordará de la paella.',
  },
  'prepare-una-playlist-especifica-para-una-cita-y-sono-la-del': {
    description: 'Empezó con Eye of the Tiger. Acabó con La Bicicleta.',
  },
  'pille-a-mi-pareja-leyendo-mis-mensajes-con-mi-mejor-amiga': {
    description: 'Sabía cosas que no debía saber. Y las usó.',
  },
  'cree-una-cuenta-falsa-para-testear-la-fidelidad-de-mi-pareja': {
    description: 'Pasó el test. Yo no.',
  },
  'segui-a-mi-pareja-a-una-discoteca-para-ver-con-quien-iba': {
    description: 'Le vi solo en la barra. Volví a casa. No volví a hacerlo.',
  },
  'aun-sigo-el-instagram-de-mi-amor-platonico-del-instituto': {
    description: 'Tiene tres hijos y vive en Bilbao. Aún miro.',
  },
  'stalkee-hasta-el-pinterest-de-la-nueva-pareja-de-mi-ex': {
    description: 'Tableros: "boda 2026", "decoración casa", "luna de miel".',
  },
  'mande-el-screenshot-de-la-persona-a-la-propia-persona': {
    description: 'En vez de al grupo. Adiós para siempre.',
  },
  'lleve-a-una-cita-al-bar-donde-curra-mi-ex-sin-saberlo': {
    description: 'Llegamos. La vi. Pedí la cuenta. Inventé enfermedad.',
  },
  'pague-la-cuenta-entera-en-una-cita-y-no-me-devolvio-ni-graci': {
    description: 'Cuarenta y dos euros con cincuenta. Lo asumo.',
  },
  'no-me-devolvio-nunca-el-bizum-de-la-primera-cita': {
    description: 'Tampoco respondió a mi último mensaje.',
  },
  'hice-match-en-tinder-en-un-aeropuerto-y-nunca-le-vi-en-mi-vi': {
    description: 'Volábamos en direcciones opuestas. Hablamos seis meses.',
  },
  'cite-a-cinco-personas-distintas-en-la-misma-semana': {
    description: 'Lunes a viernes. Sábado para descansar.',
  },
  'solte-el-clasico-no-eres-tu-soy-yo-y-me-lo-crei': {
    description: 'Era yo. Pero también era la otra.',
  },
  'me-dijeron-no-eres-tu-soy-yo-y-me-hundi-dos-meses': {
    description: 'Era yo. Lo confirmé después. No ayudó.',
  },
  'corte-con-mi-pareja-en-un-aeropuerto-antes-de-embarcar': {
    description: 'Pasó por seguridad. Yo no.',
  },
  'me-cortaron-el-dia-de-mi-cumpleanos': {
    description: 'Empezó con "tenemos que hablar". Acabé soplando velas solo.',
  },
  'cortamos-en-nochebuena-y-comi-con-mi-familia-llorando': {
    description: 'Mi madre dijo que era la salsa. Sabíamos todos que no.',
  },
  'llore-en-el-pasillo-de-cereales-del-mercadona-por-una-ruptur': {
    description: 'Una señora me dio un pañuelo. No lo aceptó.',
  },
  'borre-todas-las-fotos-con-mi-pareja-de-instagram-en-una-sola': {
    description: 'Tres horas. La casi acabé llorando con un mojito en la mano.',
  },
  'queme-cartas-de-mi-ex-en-una-bandeja-del-horno': {
    description: 'Saltó la alarma. Vinieron los bomberos. Lo conté en la fiesta.',
  },
  'tuve-que-volver-a-recoger-mis-cosas-al-piso-de-mi-ex-y-fue-h': {
    description: 'Tres bolsas IKEA. Sin hablar. Sin llorar. Sin hablar.',
  },
  'sali-con-la-ex-de-un-amigo-y-perdimos-la-amistad': {
    description: 'Era una norma no escrita. La rompí.',
  },
  'tuve-una-pelea-con-mi-pareja-en-la-fiesta-de-un-amigo': {
    description: 'Salimos discutiendo. Volvimos cogidos de la mano.',
  },
  'fingi-toda-la-cena-que-me-caian-bien-los-amigos-de-mi-pareja': {
    description: 'Sonreí tres horas. Hubiera dicho que sí a todo.',
  },
  'estoy-en-un-grupo-de-whatsapp-de-parejas-y-me-da-verguenza-b': {
    description: 'Se llama "Los pareja". Yo nunca escribo.',
  },
  'discutimos-quien-pagaba-la-cena-delante-del-camarero-diez-mi': {
    description: 'Acabamos pagando cada uno la nuestra. Camarero: cero juicios.',
  },
  'pille-a-la-pareja-de-mi-amigo-en-tinder-y-no-supe-que-hacer': {
    description: 'Tres meses callado. Cuatro meses con la duda.',
  },
  'mande-un-mensaje-subido-de-tono-a-mi-padre-por-error': {
    description: 'Solo respondió "creo que no era para mí".',
  },
  'cree-un-grupo-de-whatsapp-solo-para-analizar-mensajes-de-mi': {
    description: 'Solo dos miembros. Una conversación de mil mensajes.',
  },
  'puse-a-mi-pareja-de-fondo-de-pantalla-y-cortamos-a-la-semana': {
    description: 'Un sello. Una maldición. Una correlación.',
  },
  'me-tatue-las-iniciales-de-mi-pareja-y-luego-rompimos': {
    description: 'Lo tapé con una mariposa. Espantosa pero menos personal.',
  },
  'llevo-cinco-anos-con-la-pareja-que-conoci-en-tinder-y-nadie': {
    description: 'En las bodas mentimos: "nos presentaron unos amigos".',
  },
  'conoci-a-alguien-en-un-funeral-y-acabamos-saliendo-medio-ano': {
    description: 'Me preguntó por el muerto. Acabamos llorando juntos.',
  },
  'lie-con-la-prima-de-la-novia-en-la-boda-de-mi-mejor-amigo': {
    description: 'A las cuatro nos vio el novio. Me dijo "campeón".',
  },
  'baile-un-lento-con-un-desconocido-en-una-boda': {
    description: 'No le pregunté el nombre. Tampoco él me lo preguntó.',
  },
  'conoci-a-alguien-en-el-gym-y-ahora-cambio-de-horario-para-no': {
    description: 'Voy a las 6am. Eso me ha costado más que él.',
  },
  'stalkee-el-spotify-de-mi-pareja-para-ver-que-escucha-cuando': {
    description: 'Indie de los 2000. Sospecho de una crisis silenciosa.',
  },
  'le-quite-mi-cuenta-de-netflix-al-dia-siguiente-de-cortar': {
    description: 'Cambié la contraseña. Tardó dos semanas en notarlo.',
  },
  'perdi-la-clave-de-spotify-family-que-pagaba-mi-ex': {
    description: 'Volví al free. Con anuncios. Sufro cada uno.',
  },
  'le-mande-un-dejame-en-paz-a-mi-ex-y-le-respondi-dos-horas-de': {
    description: 'Yo escribí primero. La paz era mentira.',
  },
  'mi-grupo-de-amigos-se-dividio-en-bandos-cuando-rompi-con-mi': {
    description: 'Equipo X o equipo Y. Sin tercer camino.',
  },
  'mi-amiga-empezo-a-salir-con-mi-ex-y-la-perdi': {
    description: 'Me lo contó por whatsapp. Lo leí. No respondí.',
  },
  'comente-una-foto-de-la-pareja-de-un-amigo-con-un-emoji-raro': {
    description: 'El emoji equivocado. Tres días explicándolo.',
  },
  'bloquee-el-numero-de-los-padres-de-mi-pareja-por-error': {
    description: 'Pasé tres meses sin entender por qué no me llamaban.',
  },
  'llame-a-mi-pareja-por-otro-nombre-en-pleno-momento-intimo': {
    description: 'Paró todo. No volvimos a hablar de esa noche.',
  },
  'pase-del-te-quiero-al-ya-no-en-la-misma-noche': {
    description: 'En seis horas. Sin alcohol. Solo claridad.',
  },
  'mi-pareja-de-tres-anos-no-sabe-cual-es-mi-cancion-favorita': {
    description: 'Ha hecho playlists para mí. Ninguna acertó.',
  },
  'hice-match-con-alguien-que-vivia-en-mi-mismo-edificio-sin-sa': {
    description: 'Coincidimos en el ascensor al día siguiente. Pánico.',
  },
  'volvi-con-mi-pareja-toxica-tres-veces-seguidas': {
    description: 'A la cuarta dije que no. La quinta también.',
  },
  'mi-amiga-me-llevaba-anos-diciendo-deja-a-tu-pareja-y-por-fin': {
    description: 'Y ahora tiene razón. La odio menos por eso.',
  },
  'tire-dos-copas-en-una-cita-en-un-bar-pijo-de-madrid': {
    description: 'Una sobre el mantel. Otra sobre él.',
  },
  'tartamudee-tanto-en-una-primera-cita-que-parecio-que-no-habl': {
    description: 'Me preguntó si era turista. Soy de Cuenca.',
  },
  'perdi-las-llaves-de-la-casa-de-mi-pareja-la-primera-vez-que': {
    description: 'Aparecieron en su sofá tres semanas después.',
  },
  'mi-madre-me-encontro-tinder-abierto-en-mi-tablet': {
    description: 'No dijo nada. Me preguntó si querían cenar conmigo.',
  },
  'mi-grupo-de-amigos-sabe-mas-detalles-de-mi-relacion-que-mi-p': {
    description: 'Tienen un Excel. No exagero.',
  },
  'conte-detalles-intimos-de-mi-pareja-en-el-grupo-del-trabajo': {
    description: 'A las dos copas. El lunes lo tuve que vivir igualmente.',
  },
  'llore-con-una-cancion-tres-anos-despues-de-cortar-con-mi-ex': {
    description: 'Sonó en el supermercado. Me fui sin las patatas.',
  },
  'llevo-anos-sin-volver-al-restaurante-favorito-de-mi-ex-y-yo': {
    description: 'Quedaba mejor que el actual. Pero no puedo.',
  },
  'borre-todas-las-fotos-con-mi-ex-y-descubri-que-tenia-800': {
    description: 'Tardé el doble que en la relación entera.',
  },
  'mi-amiga-me-presta-su-cuenta-fake-para-stalkear-a-mi-ex': {
    description: 'Tiene mil seguidores. La uso para misiones.',
  },
  'pague-tarot-online-para-preguntar-si-mi-ex-iba-a-volver': {
    description: 'Doce euros. Dijo "tarde o temprano". Sigo esperando.',
  },
  'baje-tinder-de-vacaciones-y-hice-match-a-800-km-de-mi-pareja': {
    description: 'Lo borré antes de aterrizar. La culpa volvió conmigo.',
  },
  'ligue-con-el-camarero-del-hotel-toda-la-semana-de-vacaciones': {
    description: 'Le dejé propina. Y mi número.',
  },
  'volvi-de-vacaciones-decidida-a-cortar-y-aun-tarde-seis-meses': {
    description: 'La maleta tardó tres días. La decisión seis meses.',
  },
  'mi-pareja-friendzoneo-a-mi-mejor-amigo-antes-de-conocerme': {
    description: 'Lo descubrí en una cena. Triple awkward.',
  },
  'el-camarero-del-bar-de-citas-se-acuerda-de-mi-y-de-todas': {
    description: 'Me saluda con discreción. Y con resignación.',
  },
  'compre-confeti-para-el-aniversario-y-le-explote-en-la-cara-a': {
    description: 'Tardé media hora en quitárselo del pelo.',
  },
  'lleve-flores-a-una-primera-cita-y-le-dio-repelus': {
    description: 'Dijo "qué intenso". Pidió la cuenta.',
  },
  'me-llegaron-flores-al-trabajo-y-jure-que-nunca-mas': {
    description: 'Toda la oficina aplaudió. Yo me quería morir.',
  },
  'mi-suegra-me-dice-cuanto-debo-comer-en-cada-comida-familiar': {
    description: '"Tienes que comer más, hija". Llevo cuatro raciones.',
  },
  'mis-padres-llevan-dos-anos-preguntandome-por-los-nietos': {
    description: 'Tengo 27. Mi pareja tiene 25. No nos lo creemos.',
  },
  'mi-pareja-conocio-a-mis-amigos-toxicos-y-aun-asi-sigue-conmi': {
    description: 'Le doy una medalla mental cada cena.',
  },
  'conoci-a-mi-pareja-en-el-funeral-de-mi-abuela': {
    description: 'Mi abuela se reiría. La hubiera caído bien.',
  },
  'mi-amigo-me-confeso-cuernos-a-su-pareja-y-le-segui-mintiendo': {
    description: 'A ella le sonreía. A él le miraba mal en cenas.',
  },
  'acepte-una-cita-por-aburrimiento-un-domingo-por-la-tarde': {
    description: 'Salí de casa con bostezos. Volví igual.',
  },
  'acepte-una-cita-con-resaca-y-me-arrepenti-en-la-primera-cana': {
    description: 'Olía a tequila a través del perfume.',
  },
  'mando-buenos-dias-a-mi-pareja-desde-hace-cinco-anos-sin-fall': {
    description: 'Programado al despertar. Automático. Pero sentido.',
  },
  'llevamos-un-excel-de-tareas-de-casa-y-nos-peleamos-cada-lune': {
    description: 'Las celdas están en rojo. Como nuestra paciencia.',
  },
  'tengo-celos-del-videojuego-que-juega-mi-pareja-por-las-noche': {
    description: 'Habla con personajes que le entienden mejor que yo.',
  },
  'le-tengo-celos-al-perro-de-mi-pareja-en-serio': {
    description: 'Le hace más caso que a mí. Aceptable, pero duro.',
  },
  'mi-pareja-olvido-mi-cumple-pero-felicito-a-su-mejor-amiga': {
    description: 'Públicamente. En Instagram. Antes que a mí.',
  },
  'mi-perfil-de-tinder-tiene-mas-fotos-de-mi-gato-que-mias': {
    description: 'Sale más guapo. Es estrategia.',
  },
  'subi-una-foto-en-pareja-cortamos-y-la-deje-un-mes-mas': {
    description: 'Esperando que me preguntara. Nadie preguntó.',
  },
  'probe-el-poliamor-con-mi-pareja-y-explote-a-la-segunda-seman': {
    description: 'Tres rupturas en una. Ahorré tiempo.',
  },
  'mis-amigos-me-comieron-el-coco-y-le-hice-ghosting-al-partida': {
    description: 'Tres años después aún me cruzo con él en el barrio.',
  },
  'tuve-relacion-de-erasmus-que-duro-cuatro-meses-y-un-vuelo': {
    description: 'Aterrizó. Cortó. Volvió a su novia previa.',
  },
  'mi-pareja-de-erasmus-se-fue-y-nunca-volvio-a-contestar': {
    description: 'Le mandé un feliz cumple seis meses después. Ningún visto.',
  },
  'firmamos-un-piso-juntos-y-cortamos-antes-de-mudarnos': {
    description: 'Pagamos la fianza. Vivió cada uno por su lado.',
  },
  'vivimos-juntos-seis-meses-y-rompimos-en-el-septimo': {
    description: 'La cocina nos rompió. Mucho antes que el sofá.',
  },
  'me-cortaron-por-mensaje-a-las-8-antes-de-entrar-al-curro': {
    description: 'Trabajé esas ocho horas como si nada. Me hundí en casa.',
  },
  'acabe-en-una-primera-cita-en-la-misma-mesa-donde-estuve-con': {
    description: 'El camarero me reconoció. No mencionó nada.',
  },
  'cortamos-y-mis-amigos-me-preguntaron-primero-por-mi-ex': {
    description: 'Me caía menos bien que antes. Ahora aún menos.',
  },
  'mi-pareja-no-baila-nunca-en-las-bodas-y-tengo-que-mendigar': {
    description: 'Bailo con sus primas. Cada año más bromas.',
  },
  'mi-pareja-elige-siempre-la-peli-en-el-cine-y-siempre-es-mala': {
    description: 'Ya no negocio. Llevo audiolibro.',
  },
  'discutimos-por-la-marca-de-mantequilla-del-mercadona': {
    description: 'Quince minutos. Por dos euros. Por un principio.',
  },
  'llevamos-cinco-anos-peleando-por-el-cargador-del-movil': {
    description: 'Compramos doce. Siempre falta uno. Siempre.',
  },
  'conoci-a-alguien-por-amigos-comunes-y-acabamos-juntos-un-ano': {
    description: 'Nos presentaron en plan ironic. Salió en serio.',
  },
  'mi-pareja-y-yo-llevamos-anos-saliendo-y-no-nos-seguimos-en-i': {
    description: 'Decisión consciente. Nos protege a los dos.',
  },
  'tire-piedrecitas-a-la-ventana-de-mi-crush-y-rompi-el-cristal': {
    description: 'Su madre bajó. Fue una conversación incómoda.',
  },
  'pase-andando-por-la-casa-de-mi-ex-tres-veces-el-dia-que-romp': {
    description: 'Vivía a 15 minutos. Tardé una hora cada vuelta.',
  },
  'borre-la-app-justo-despues-de-conocer-a-mi-pareja-y-nunca-vo': {
    description: 'Cuatro años. Ningún sondeo. Ninguna mirada atrás.',
  },
  'hice-match-con-alguien-del-trabajo-y-nos-hicimos-los-locos': {
    description: 'Pasamos al lado del otro cada lunes sin mirar.',
  },
  'tengo-celos-de-una-persona-del-trabajo-de-mi-pareja-desde-ha': {
    description: 'Sé su nombre. Su puesto. Cuándo come con ella.',
  },
  'estuve-saliendo-con-alguien-dos-meses-sin-decirselo-a-mis-am': {
    description: 'Cuando lo conté, ya habíamos cortado.',
  },
  'quede-en-una-cita-y-la-persona-del-perfil-ni-existia': {
    description: 'Las fotos eran de un actor turco. Lo googleé.',
  },
  'pagamos-cada-uno-nuestra-cuenta-en-un-restaurante-de-anivers': {
    description: 'Aniversario equitativo. También triste.',
  },
  'mantuve-borrador-del-mensaje-de-cortar-dos-meses-antes-de-ma': {
    description: 'Lo edité semanalmente. Cuando lo mandé era diferente.',
  },
  'pense-que-era-una-broma-cuando-me-dijo-quiero-cortar': {
    description: 'Me reí. Él no. Ahí entendí.',
  },
  'llore-en-la-tienda-de-vodafone-cancelando-una-promo-familiar': {
    description: 'El comercial me dio kleenex. Y un descuento.',
  },
  'tinder-me-recomienda-a-mi-propio-primo-y-a-tres-del-curro': {
    description: 'El algoritmo me odia. O me conoce demasiado bien.',
  },
  'conoci-a-mis-suegros-borracho-perdido-en-su-salon': {
    description: 'Llamé a su perro "tu hermano". Mi pareja casi llora.',
  },
  'llegue-a-una-primera-cita-sin-ducharme-y-se-noto': {
    description: 'Llegaba directo del gimnasio. No supe disimular.',
  },
  'lleve-el-mismo-outfit-a-tres-primeras-citas-seguidas': {
    description: 'Mismo bar. Mismo banquete. Mismo discurso.',
  },
  'corte-en-un-restaurante-y-un-camarero-me-aplaudio-de-fondo': {
    description: 'Le dejé propina extra. Lo merecía.',
  },
  'tengo-celos-de-la-mejor-amiga-de-mi-pareja-desde-hace-siglos': {
    description: 'Es alta. Es tatuada. Es soltera. Punto.',
  },
  'lleve-a-mi-pareja-al-bar-de-mis-amigos-y-todos-sospecharon': {
    description: 'No sospechaban de él. Sospechaban de mí.',
  },
  'mi-pareja-no-sabe-en-que-trabajo-despues-de-dos-anos': {
    description: 'Sabe que abro un Excel. No sabe qué hago dentro.',
  },
  'conoci-a-mi-pareja-en-una-comunion-cuando-tenia-12-anos': {
    description: 'Llevamos quince años juntos. Y dos hijos.',
  },
  'corte-con-mi-pareja-por-buzon-de-voz-porque-no-me-lo-cogia': {
    description: 'Tres minutos hablando con la grabadora. Indignación pura.',
  },

  // ===== v3-trabajo (199) ===============================================
  'encendi-la-camara-en-teams-y-estaba-en-pijama': {
    description: 'Lo gracioso es que la pijama era de Hello Kitty.',
  },
  'me-robaron-el-tuper-del-frigorifico-de-la-oficina': {
    description: 'Lentejas con chorizo. Un crimen sin testigos.',
  },
  'hable-pestes-del-jefe-sin-saber-que-tenia-el-micro-abierto': {
    description: 'Lo siguió escuchando 40 segundos. Sin reaccionar.',
  },
  'compre-uno-de-esos-cacharros-que-mueven-el-raton-solo': {
    description: 'Doce euros bien invertidos. Sigo verde permanente.',
  },
  'llore-en-el-bano-de-la-oficina-entre-reuniones': {
    description: 'Cinco minutos. Volví con la cara lavada. Sonreí.',
  },
  'me-dormi-en-una-reunion-de-teams-con-la-camara-puesta': {
    description: 'Ronqué. Lo capturaron. Sigue circulando.',
  },
  'mande-un-correo-diciendo-adjunto-sin-adjuntar-nada': {
    description: 'Tres minutos después llegó el siguiente: "Ahora sí".',
  },
  'mande-un-audio-cachondo-al-canal-de-la-empresa': {
    description: 'Lo borré en seis segundos. Ya lo había escuchado RRHH.',
  },
  'me-ha-salido-el-verde-de-slack-a-las-3-de-la-manana': {
    description: 'Sin justificación. Sin explicación. Solo verde.',
  },
  'mi-jefe-lleva-2-anos-llamandome-por-otro-nombre': {
    description: 'Empezamos con Carlos. Ahora es Manuel. No corrijo.',
  },
  'estuve-dos-semanas-sin-saber-donde-estaba-el-bano': {
    description: 'Aguantaba hasta llegar a casa. El metro me odia.',
  },
  'mi-primer-dia-y-el-portatil-no-encendia': {
    description: 'IT tardó tres días. Yo ya conocía a todos.',
  },
  'ensaye-el-discurso-de-dimision-40-veces-frente-al-espejo': {
    description: 'No lo solté nunca. Sigo en la empresa.',
  },
  'me-echaron-un-viernes-a-las-1755': {
    description: 'Ya tenía el bolso preparado. Me ahorraron el lunes.',
  },
  'puse-excel-avanzado-en-el-cv-y-solo-se-sumar': {
    description: 'Aprendí TABLA DINÁMICA en YouTube el lunes.',
  },
  'sali-de-una-entrevista-y-me-eche-a-llorar-en-el-coche': {
    description: 'Me cogieron. Acepté. Ya no lloro tanto.',
  },
  'me-ascendieron-pero-sin-subida-de-sueldo': {
    description: 'Ahora tengo "responsabilidad". Y el mismo nómina.',
  },
  'he-visto-el-ascenso-de-un-ex-companero-y-se-me-ha-caido-el-a': {
    description: 'Lo felicité con un emoji. Lloré después.',
  },
  'el-domingo-a-las-19h-me-entra-una-ansiedad-que-no-veas': {
    description: 'A las 19:01 ya no soy yo del todo.',
  },
  'he-hecho-una-reunion-por-zoom-desde-la-playa': {
    description: 'Fondo virtual de oficina. Arena en el teclado.',
  },
  'he-currado-en-remoto-sin-salir-de-la-cama-en-todo-el-dia': {
    description: 'Salí solo a por agua. Y a las 22h.',
  },
  'llevo-8-meses-en-remoto-y-nadie-sabe-que-cara-tengo': {
    description: 'En la foto de Slack tengo gafas. Ya no las llevo.',
  },
  'tengo-200-pestanas-abiertas-y-no-me-atrevo-a-cerrarlas': {
    description: 'Cada una tenía un propósito. Ya no recuerdo cuál.',
  },
  'vomite-en-la-cena-de-empresa': {
    description: 'En el baño. En la pared. En mi propio reflejo.',
  },
  'dije-lo-que-pensaba-del-jefe-en-la-cena-de-navidad': {
    description: 'En enero todo el mundo se hizo el sordo.',
  },
  'subi-un-post-a-linkedin-que-aun-me-da-verguenza': {
    description: 'Empezaba con "Reflexión del lunes". Lo borré. Tarde.',
  },
  'llegue-a-una-reunion-con-cliente-con-una-mancha-de-cafe-enor': {
    description: 'Forma de mapa de Italia. Saludé como si nada.',
  },
  'llegue-en-chandal-el-dia-que-todos-iban-de-traje': {
    description: 'Era una "casual friday" que no era. Por suerte fue jueves.',
  },
  'calente-pescado-en-el-microondas-comunal': {
    description: 'Tres compañeros se levantaron. Uno me odia desde entonces.',
  },
  'he-comido-solo-mirando-el-movil-3-anos-seguidos': {
    description: 'Mismo táper. Misma mesa. Mismo Twitter.',
  },
  'mande-al-becario-a-por-cafes-y-se-equivoco-con-todos': {
    description: 'Cinco cafés. Cinco equivocaciones. Bebimos en silencio.',
  },
  'mi-jefe-presento-como-suyo-el-trabajo-que-hice-yo': {
    description: 'Yo estaba en la sala. Le aplaudieron.',
  },
  'no-me-mencionaron-en-el-correo-del-proyecto-que-lleve-yo': {
    description: 'Mi jefe respondió "buen trabajo equipo". El equipo era yo.',
  },
  'descubri-que-mi-companero-cobra-600-mas-que-yo': {
    description: 'Vi su nómina abierta en su pantalla. Se me cayó el alma.',
  },
  'el-primer-dia-de-vuelta-de-vacaciones-me-odio-a-mi-mismo': {
    description: 'A las 9:01 ya estaba mirando vuelos.',
  },
  'rrhh-me-cito-para-hablar-y-casi-me-da-algo': {
    description: 'Era para "feedback". Cuarenta minutos de pánico.',
  },
  'puse-en-copia-al-jefe-en-un-correo-donde-le-criticaba': {
    description: 'Lo descubrí cuando respondió. No lo borré a tiempo.',
  },
  'mande-un-correo-super-importante-con-el-asunto-vacio': {
    description: 'Lo mandó al spam. Llegué tarde a la entrega.',
  },
  'reenvie-sin-querer-una-cadena-de-mensajes-privados-al-client': {
    description: 'Tres páginas de quejas sobre él. Cara a cara la siguiente.',
  },
  'entre-20-minutos-tarde-a-la-reunion-porque-iba-la-vpn': {
    description: 'Excusa de oro. Lleva tres años funcionando.',
  },
  'me-deje-el-micro-abierto-mientras-meaba-en-una-reunion': {
    description: 'Cinco minutos de stream en directo. Sin advertir.',
  },
  'se-me-cayo-el-fondo-virtual-y-se-vio-mi-cuarto-destrozado': {
    description: 'Cama sin hacer. Pósters de los 2000. Calzoncillos por el suelo.',
  },
  'mi-perro-se-puso-a-ladrar-a-mitad-de-presentacion': {
    description: 'Cinco minutos seguidos. Le explicaba a un amazon.',
  },
  'mi-madre-entro-al-cuarto-en-mitad-de-una-reunion-gritando': {
    description: 'Que si quería pollo. Me llamaron Manuel ese día.',
  },
  'camisa-arriba-pantalon-de-pijama-abajo-en-todas-las-reunione': {
    description: 'El día que tuve que levantarme fue mi peor pesadilla.',
  },
  'llevo-2-anos-en-mi-puesto-y-aun-no-se-que-hago-exactamente': {
    description: 'Cobro. Asisto a reuniones. Asiento. Funciona.',
  },
  'mi-jefe-me-manda-buscar-cosas-que-el-podria-googlear': {
    description: 'Esa es mi función oficial. La descubrí tarde.',
  },
  'mi-jefe-me-pregunta-cada-hora-como-va': {
    description: 'Tengo respuestas pre-grabadas. "Bien, en proceso, casi".',
  },
  'mi-jefe-me-deja-en-visto-durante-dias': {
    description: 'Y luego me llama urgente por el mismo tema.',
  },
  'el-que-se-trae-cocido-madrileno-en-tupper-a-la-oficina': {
    description: 'Soy yo. Me lo dicen con cariño. Y con asco.',
  },
  'llevo-4-anos-sentado-al-lado-de-alguien-que-no-me-ha-hablado': {
    description: 'Sé qué desayuna. Su nombre lo busqué en el directorio.',
  },
  'dia-1-y-no-sabia-donde-sentarme-me-quede-de-pie-media-hora': {
    description: 'Hasta que alguien me hizo señas. Casi llorando.',
  },
  'me-pille-sin-papel-en-el-bano-de-la-oficina': {
    description: 'Saqué el móvil. Pedí ayuda por Slack. Vino mi jefe.',
  },
  'coincidi-en-el-ascensor-con-el-director-y-no-dije-nada': {
    description: 'Veintidós plantas en silencio. Las bajé en silencio también.',
  },
  'mande-el-cv-con-el-nombre-de-otra-empresa-en-el-asunto': {
    description: 'No me cogieron. Ni la otra ni esta.',
  },
  'puse-c1-en-ingles-y-solo-se-how-are-you': {
    description: 'En la entrevista en inglés sudaba. Pasé. No sé cómo.',
  },
  'cai-muy-bien-en-la-entrevista-al-que-no-tenia-voto': {
    description: 'Me lo dijo después de no contratarme.',
  },
  'dije-que-mi-mayor-defecto-era-ser-perfeccionista': {
    description: 'Me miró con compasión. No insistió.',
  },
  'presente-unas-slides-que-no-habia-abierto-ni-una-vez': {
    description: 'Improvisé en directo. Salió mejor que las preparadas.',
  },
  'hice-un-power-point-en-la-pausa-de-cafe-antes-de-presentarlo': {
    description: 'Quince minutos. Veinte slides. Lo aplaudieron.',
  },
  'me-cargaron-con-todo-porque-nunca-digo-que-no': {
    description: 'Aprendí a decir "déjame revisarlo". Ahora me dan menos.',
  },
  'he-trabajado-un-domingo-y-nadie-me-lo-agradecio': {
    description: 'Volví a casa a las 22h. Mi familia ya había cenado.',
  },
  'en-mis-vacaciones-mire-el-correo-cada-hora': {
    description: 'En la playa. En la cama. En el restaurante.',
  },
  'cancele-el-medico-para-asistir-a-una-reunion-que-se-cancelo': {
    description: 'Me pidieron disculpas por mensaje. La cita la perdí.',
  },
  'he-comido-un-bocadillo-en-la-mesa-mientras-curraba': {
    description: 'Migas en el teclado. Aceite en el ratón. Cero remordimientos.',
  },
  'me-tome-el-decimo-cafe-del-dia-y-me-temblaba-todo': {
    description: 'No pude escribir el correo. Sí el meme del grupo.',
  },
  'dimiti-y-a-los-6-meses-me-llamaron-y-volvi': {
    description: 'Con un 200 más. Y los mismos compañeros.',
  },
  'vaya-justo-cuando-hay-mas-curro-me-dijo-al-pedir-vacaciones': {
    description: 'Llevaba dos años sin pedir días. Era agosto.',
  },
  'pase-mi-cumpleanos-currando-hasta-las-21h': {
    description: 'Comí un sándwich con la cámara apagada. Soplé velas en Teams.',
  },
  'conecte-con-mi-ex-en-linkedin-por-aburrimiento': {
    description: 'Aceptó. Ahora me da likes en posts de jueves.',
  },
  'me-rechazaron-con-un-seguiremos-en-contacto-y-nunca-mas': {
    description: 'Sigue ahí esperando contacto. Sigo esperando yo.',
  },
  'aplique-a-100-ofertas-en-una-semana-y-solo-respondieron-2': {
    description: 'Una para decir que no. La otra era spam.',
  },
  'hice-una-prueba-tecnica-de-8-horas-y-luego-me-ghostearon': {
    description: 'Sigo viendo "tu candidatura está siendo revisada". Lleva un año.',
  },
  'me-rechazaron-porque-no-encajaba-con-la-cultura': {
    description: 'La cultura era ir al gym a las 6am. No la mía.',
  },
  'llore-un-domingo-solo-de-pensar-en-el-lunes': {
    description: 'En el sofá. Con la peli puesta. Sin haberla mirado.',
  },
  'pase-3-noches-sin-dormir-por-una-entrega-que-nadie-miro': {
    description: 'Llegó. Lo enviaron. Nadie lo abrió en seis meses.',
  },
  'tengo-un-post-it-con-renuncia-pegado-en-el-cajon': {
    description: 'Lo escribí en 2022. Sigue ahí. Sin firmar.',
  },
  'busco-trabajo-desde-el-ordenador-del-trabajo': {
    description: 'Con InfoJobs en una pestaña secreta detrás del Outlook.',
  },
  'pedi-baja-con-un-dolor-de-espalda-inventado': {
    description: 'Tres días en cama. Me grabé estiramientos por si acaso.',
  },
  'he-currado-con-resaca-brutal-sin-que-se-notase-creo': {
    description: 'Mi jefe me preguntó si dormía bien. Bandera roja.',
  },
  'llamada-perdida-del-jefe-un-domingo-y-casi-me-da-algo': {
    description: 'Estuve dos horas dudando si devolver. No devolví.',
  },
  'no-conteste-al-jefe-un-domingo-y-me-senti-muy-adulto': {
    description: 'El lunes hizo como si nada. Yo también.',
  },
  'estoy-en-un-grupo-de-whatsapp-del-curro-y-nunca-he-hablado': {
    description: '347 mensajes. Cero respuestas mías. Estable.',
  },
  'tengo-silenciado-el-grupo-del-curro-hasta-el-ano-2099': {
    description: 'Lo configuro cada año. Es ritual.',
  },
  'he-programado-correos-a-las-22h-para-que-parezca-que-curro-t': {
    description: 'Me dormía a las 21:30. El correo lo enviaba solo.',
  },
  'alttab-compulsivo-cada-vez-que-pasa-el-jefe': {
    description: 'Detrás del Excel siempre Twitter. Reflejos pavlovianos.',
  },
  'he-pasado-un-dia-entero-sin-hacer-absolutamente-nada': {
    description: 'Cero correos enviados. Cero líneas escritas. Cobré igual.',
  },
  'me-pregunto-algo-el-jefe-en-una-reunion-y-dije-lo-primero': {
    description: 'No tenía nada que ver. Asintió. Pasó al siguiente.',
  },
  'llevo-6-meses-en-una-cadena-de-correos-que-ya-no-entiendo': {
    description: 'Respondí "ok" a todo. A ver qué pasa.',
  },
  'mande-un-correo-al-cliente-con-una-falta-enorme-en-el-asunto': {
    description: '"Reunoin" en mayúsculas. Lo recibieron 47 personas.',
  },
  'empece-un-correo-con-estimado-cuando-ya-nos-tuteabamos': {
    description: 'Acabé con un "saludos cordiales". Nivel monje.',
  },
  'mande-un-meme-de-mierda-al-canal-general-por-error': {
    description: 'Era para mi pareja. Lo borré. Sin mucho éxito.',
  },
  'hice-screenshot-de-un-mensaje-de-slack-y-lo-pegue-en-el-mism': {
    description: 'Tres minutos hasta entender qué había hecho.',
  },
  'le-escribi-te-amo-al-grupo-de-la-empresa-pensando-que-era-mi': {
    description: 'Mi jefe respondió "yo también". Risa nerviosa colectiva.',
  },
  'llame-mama-a-mi-jefa-por-error': {
    description: 'En la reunión. En voz alta. Con seis personas mirando.',
  },
  'el-becario-sabe-mas-que-yo-y-lo-disimulo-como-puedo': {
    description: 'Le pregunto cosas en privado. Le pago el café.',
  },
  'llego-un-junior-y-me-hizo-sentir-un-dinosaurio': {
    description: 'Sabe usar herramientas que no he abierto.',
  },
  'me-pusieron-a-hacer-un-curso-obligatorio-y-solo-le-di-a-sigu': {
    description: 'Catorce módulos. Tres minutos cada uno. Aprendí cero.',
  },
  'le-di-a-siguiente-50-veces-y-me-dieron-un-certificado': {
    description: 'Ahora soy "Especialista en Excel". Sin abrir Excel.',
  },
  'llevo-un-mes-esperando-que-it-responda-mi-ticket': {
    description: 'Estado: "En revisión". Lleva ahí 32 días.',
  },
  'it-me-dijo-apaga-y-enciende-y-funciono-que-rabia': {
    description: 'Treinta minutos esperándole. Cinco segundos para arreglarlo.',
  },
  'word-se-cerro-sin-guardar-y-perdi-4-horas-de-curro': {
    description: 'Lloré. Volví a empezar. Salió peor.',
  },
  'borre-sin-querer-el-excel-compartido-del-equipo': {
    description: 'Tres meses de trabajo. Sin papelera de reciclaje.',
  },
  'llevo-3-horas-peleandome-con-un-vlookup-que-no-me-sale': {
    description: 'ChatGPT lo resolvió en treinta segundos. Me sentí inútil.',
  },
  'he-googleado-como-hacer-una-suma-en-excel-con-28-anos': {
    description: 'Sin pestañas privadas. Modo público. Sin remordimientos.',
  },
  'le-contesto-al-jefe-con-cosas-que-me-genera-chatgpt': {
    description: 'Sin tocar una coma. Asciende cada año.',
  },
  'la-ia-me-hace-el-trabajo-y-me-sobran-6-horas-al-dia': {
    description: 'Las uso para ver TikTok y reflexionar.',
  },
  'dije-que-habia-leido-el-pdf-de-80-paginas-sin-abrirlo': {
    description: 'Me preguntaron por la página 47. Inventé.',
  },
  'pregunte-algo-en-reunion-y-ya-estaba-contestado': {
    description: 'Cuatro segundos antes. No estaba escuchando.',
  },
  'me-he-quedado-mudo-en-una-reunion-y-nadie-ha-notado-mi-prese': {
    description: 'Cincuenta minutos. Cero palabras. Cero menciones.',
  },
  'asenti-en-una-reunion-sin-entender-ni-una-palabra': {
    description: 'Cuando me pidieron opinión: "lo apoyo plenamente".',
  },
  'me-he-tragado-una-reunion-de-2h-que-era-un-correo': {
    description: 'Lo dije. Mi jefe asintió. Reservó otra reunión.',
  },
  'tuve-una-reunion-para-preparar-otra-reunion': {
    description: 'Y la otra reunión también necesitó preparación.',
  },
  'tengo-el-calendario-tan-lleno-que-no-me-da-tiempo-a-comer': {
    description: 'Como entre llamadas. Mute encendido. Cámara apagada.',
  },
  'acepte-dos-reuniones-a-la-vez-y-me-hice-el-desconectado': {
    description: 'En las dos puse "tengo problemas de conexión".',
  },
  'llevo-todo-el-ano-esperando-el-bonus-y-han-sido-200': {
    description: 'Me lo gasté en un ibuprofeno y un café. Un café.',
  },
  'la-subida-no-llego-ni-a-cubrirme-el-ipc': {
    description: 'Cobro menos en términos reales. Lo agradezco con una sonrisa.',
  },
  'pedi-aumento-y-me-dijeron-el-ano-que-viene-como-siempre': {
    description: 'Llevo cuatro años haciendo esa misma reunión.',
  },
  'abri-la-nomina-y-se-me-cayo-el-alma-a-los-pies': {
    description: 'Las retenciones más altas. El neto más bajo.',
  },
  'tengo-dos-curros-remotos-a-la-vez-y-no-se-enteran': {
    description: 'Dos pantallas. Dos cuentas. Doble nómina.',
  },
  'el-cliente-lleva-3-meses-sin-pagarme-la-factura': {
    description: 'Se la mando cada lunes. Me responde "lo veo".',
  },
  'pago-la-cuota-de-autonomo-y-me-echo-a-llorar': {
    description: 'Cada mes. Cada mes igual. Sin acostumbrarme.',
  },
  'me-equivoque-con-un-modelo-y-hacienda-me-trajo-de-cabeza': {
    description: 'Ocho meses para resolverlo. Cien euros de multa.',
  },
  'mi-companero-me-manda-correos-pasivo-agresivos-en-cc-al-jefe': {
    description: 'Cada mensaje empieza con "Solo recordatorio".',
  },
  'reunion-sin-agenda-y-se-ha-alargado-90-minutos': {
    description: 'Salimos sin ninguna decisión. Pero comimos juntos.',
  },
  'sali-con-cara-de-psicopata-en-la-foto-corporativa-de-la-web': {
    description: 'Sigue ahí. Cinco años. Sin cambios.',
  },
  'llevo-5-anos-con-la-misma-foto-de-linkedin-que-no-me-parezco': {
    description: 'Cuando me ven me preguntan si soy yo.',
  },
  'en-una-dinamica-de-grupo-no-abri-la-boca-y-no-me-cogieron': {
    description: 'Otro candidato sí. Ahora cobra 50k. Yo cobro paro.',
  },
  'siempre-me-toca-a-mi-ser-el-que-toma-actas': {
    description: 'Y luego nadie las lee. Ni yo.',
  },
  'organizo-siempre-los-cumples-y-nadie-organiza-el-mio': {
    description: 'Tres velas. En mi mesa. Con un yogur.',
  },
  'me-toco-el-amigo-invisible-y-me-regalaron-un-boli-del-banco': {
    description: 'Un boli. De ING. Sin tinta.',
  },
  'nos-llevaron-a-paintball-y-acabe-con-moratones': {
    description: 'Mi jefe me disparó tres veces. Sospecho intencional.',
  },
  'tuvimos-que-decir-una-virtud-del-companero-y-mori-por-dentro': {
    description: 'Dije "es muy puntual". Falso. Llega media hora tarde.',
  },
  'me-hicieron-hacer-un-role-play-en-una-formacion-verguenza-ma': {
    description: 'Tuve que vender un boli. Saqué un boli. Cobré 0€.',
  },
  'me-toco-decir-un-dato-curioso-sobre-mi-en-el-onboarding': {
    description: 'Dije que vi una ballena. Llevo tres años justificándolo.',
  },
  'el-cliente-lo-cambio-todo-el-dia-antes-de-la-entrega': {
    description: 'Diez horas seguidas para rehacerlo. Lo aprobaron a la primera.',
  },
  'el-cliente-me-dijo-tu-sabes-lo-que-necesito': {
    description: 'No. No lo sé. Llevo seis meses preguntándolo.',
  },
  'cliente-me-llamo-un-sabado-a-las-23h-y-respondi': {
    description: 'Bebido. Suspiré tres veces. Resolví el problema.',
  },
  'presentacion-importante-y-el-proyector-no-funcionaba': {
    description: 'Compartí pantalla. La tuve que rehacer en directo.',
  },
  'se-me-quedo-tildado-el-clicker-en-mitad-de-la-presentacion': {
    description: 'Treinta y dos slides en una pantalla. Improvisé.',
  },
  'nos-mudaron-de-oficina-y-ahora-tardo-1h-mas-al-dia': {
    description: 'Sin compensación. Sin alternativas. Con resignación.',
  },
  'nos-hicieron-volver-presencial-5-dias-y-me-quiero-morir': {
    description: 'Empecé a buscar otra cosa el primer día.',
  },
  'cojo-metro-a-las-8-de-la-manana-y-soy-una-sardina': {
    description: 'No me da el aire. Llego sudoroso. Curro.',
  },
  'en-la-oficina-hacen-18-grados-y-curro-con-manta': {
    description: 'Llevo bufanda. Llevo guantes sin dedos.',
  },
  'en-invierno-la-oficina-esta-a-14-grados-y-nadie-hace-nada': {
    description: 'RRHH dice que es para "ahorrar". Cobramos lo mismo.',
  },
  'llevo-6-meses-con-la-silla-rota-y-rrhh-dice-ya-veremos': {
    description: 'Ya veremos en marzo. Llevamos noviembre del año siguiente.',
  },
  'mi-alfombrilla-esta-mas-sucia-que-las-escaleras-del-metro': {
    description: 'Tres años acumulando café, migas y secretos.',
  },
  'me-dieron-una-sudadera-con-el-logo-y-la-uso-para-dormir': {
    description: 'Mi pareja la odia. Yo dormiría con tres.',
  },
  'vi-el-mensaje-del-jefe-y-dije-que-no-me-habia-llegado': {
    description: 'Triple check azul. Ya estaba mintiendo.',
  },
  'he-ido-al-banco-y-a-hacer-la-compra-entre-reuniones': {
    description: 'Trabajo en remoto. Productividad nivel dios.',
  },
  'he-pasado-toda-la-manana-en-la-cocina-hablando-con-companero': {
    description: 'Cuatro cafés. Cero líneas escritas.',
  },
  'fingi-una-tos-para-no-ir-a-la-oficina': {
    description: 'Ensayé tres días en el espejo. Salió convincente.',
  },
  'invente-una-cita-medica-para-salir-antes': {
    description: 'Era una cerveza. Llegué tarde igual.',
  },
  'dije-que-mi-pareja-tenia-una-emergencia-para-salir-antes': {
    description: 'No tengo pareja. No me preguntaron detalles.',
  },
  'invente-un-funeral-para-coger-un-dia-libre': {
    description: 'Mi tío imaginario. Va por el segundo entierro.',
  },
  'me-quede-en-blanco-delante-de-un-cliente-importante': {
    description: 'Diez segundos de silencio. Le sonreí.',
  },
  'llame-al-cliente-por-el-nombre-del-cliente-anterior': {
    description: 'Lo dije tres veces antes de notarlo.',
  },
  'le-deje-en-visto-al-cliente-3-dias-y-aun-no-he-contestado': {
    description: 'Cada día que pasa es más imposible.',
  },
  'dije-que-iba-al-80-y-aun-no-habia-empezado': {
    description: 'Mañana me lo planteo en serio.',
  },
  'empece-el-proyecto-el-dia-antes-de-la-entrega': {
    description: 'Once horas seguidas. Fue mi mejor proyecto.',
  },
  'he-pedido-prorroga-5-veces-de-la-misma-tarea': {
    description: 'Cada prórroga genera otra prórroga.',
  },
  'para-final-del-dia-significa-que-voy-a-currar-hasta-las-23h': {
    description: 'O hasta las 2am. Depende del año.',
  },
  'es-algo-rapido-y-me-ha-llevado-3-dias': {
    description: '"Algo rápido" siempre lleva tres días. Ley universal.',
  },
  'me-pidieron-una-cosita-y-acabe-haciendo-todo-el-proyecto': {
    description: 'La cosita era el primer paso de un mes de curro.',
  },
  'estime-un-proyecto-en-1-semana-y-duro-4': {
    description: 'Es lo normal. Lo extraño es que dure menos.',
  },
  'no-comi-en-todo-el-dia-por-una-entrega-y-nadie-lo-noto': {
    description: 'Acabé desmayándome a las 19h. Solo en mi piso.',
  },
  'mi-jefe-me-llamo-en-mitad-de-una-cena-con-amigos-y-respondi': {
    description: 'Salí a la calle. Estuve treinta minutos. Volví fría.',
  },
  'reviso-el-correo-en-la-cama-antes-de-dormir-todos-los-dias': {
    description: 'Cinco minutos diciendo "ya está". Veinte después.',
  },
  'sone-con-mi-jefe-y-me-desperte-llorando': {
    description: 'Era una pesadilla. Estaba en la oficina los domingos.',
  },
  'tuve-un-ataque-de-ansiedad-delante-del-ordenador': {
    description: 'Cerré el portátil. Me fui al baño. Volví como si nada.',
  },
  'voy-al-psicologo-solo-por-el-trabajo': {
    description: 'Pago 80€/sesión. Le hablo del jefe. Y de los emails.',
  },
  'estuve-de-baja-por-ansiedad-2-meses': {
    description: 'Volví. Sigue todo igual. Me sorprendió.',
  },
  'voy-al-gym-a-las-22h-porque-es-lo-unico-que-controlo-del-dia': {
    description: 'Levantar pesos es la única decisión que tomo yo.',
  },
  'me-bebo-una-copa-de-vino-todas-las-noches-despues-de-currar': {
    description: 'No es una. Es la primera. Y la más sentida.',
  },
  'los-domingos-por-la-tarde-me-deprimo-solo-de-pensar': {
    description: 'A las 18h ya empiezo. A las 22h estoy roto.',
  },
  'sueno-con-dimitir-todos-los-dias-pero-no-me-atrevo': {
    description: 'Tengo el correo redactado. Sin enviar. Tres años.',
  },
  'reviso-la-cuenta-el-dia-30-cada-hora-a-ver-si-entra-el-sueld': {
    description: 'Me han pagado el día 31 dos veces. Lo recuerdo.',
  },
  'el-sueldo-me-dura-4-dias-y-luego-cuenta-atras': {
    description: 'Día 5 ya estoy comiendo arroz blanco.',
  },
  'pedi-un-adelanto-y-casi-me-da-algo-de-la-verguenza': {
    description: 'Me lo dieron sin preguntar. Eso fue peor.',
  },
  'la-empresa-quebro-y-me-entere-por-linkedin': {
    description: 'Mi jefe lo posteó como "nuevos retos profesionales".',
  },
  'pase-un-ere-y-aun-tengo-pesadillas': {
    description: 'Cada vez que se reúne RRHH sin avisar.',
  },
  'no-me-renovaron-el-contrato-y-me-entere-el-ultimo-dia': {
    description: 'Mi jefe lo dijo casual. Yo me reí. Lloré en casa.',
  },
  'cobre-paro-y-me-daba-verguenza-decirlo': {
    description: 'En las cenas decía "estoy entre proyectos".',
  },
  'tuve-que-volver-a-casa-de-mis-padres-con-30-anos-por-el-curr': {
    description: 'Mi habitación seguía con los pósters de los 16.',
  },
  'tengo-dos-curros-y-aun-asi-no-llego-a-fin-de-mes': {
    description: 'Madrid. Alquiler. Cervezas. Las cuentas no salen.',
  },
  'acabe-la-carrera-y-al-final-estoy-de-camarero': {
    description: 'Cinco años de uni para sacar cañas. Y propinas.',
  },
  'llevo-2-anos-fingiendo-que-se-usar-la-impresora': {
    description: 'Cuando se atasca finjo no estar. Vuelvo cuando pasó.',
  },
  'atasque-la-impresora-y-me-fui-sin-avisar': {
    description: 'Vinieron cuatro personas. Aún no me acusan.',
  },
  'le-preste-el-cargador-a-alguien-y-nunca-lo-recupere': {
    description: 'Lo veo en su escritorio cada día. Nunca lo reclamo.',
  },
  'me-roban-la-grapadora-cada-semana': {
    description: 'Llevo el séptimo modelo. La marqué. Sigue desapareciendo.',
  },
  'tuve-que-comprar-regalo-para-el-jefe-y-no-sabia-que': {
    description: 'Le compré una taza con su nombre mal escrito.',
  },
  'tuve-que-cantar-el-cumpleanos-feliz-en-la-oficina-y-mori': {
    description: 'Treinta personas mirándome. Sin alcohol. Sin sentido.',
  },
  'pille-al-jefe-llorando-en-su-despacho-y-no-supe-que-hacer': {
    description: 'Cerré la puerta. Hice como si no.',
  },
  'vi-a-dos-companeras-gritarse-y-me-hice-el-invisible': {
    description: 'Auriculares puestos. Cabeza baja. Velocidad de tortuga.',
  },
  'llevo-un-mes-con-el-rumor-de-que-cierran-y-nadie-dice-nada': {
    description: 'Slack está en silencio. Demasiado silencio.',
  },
  'llevo-anos-buscando-el-curro-perfecto-y-entiendo-que-no-exis': {
    description: 'Cada empresa tiene su locura. Solo cambia el sabor.',
  },
  'cuando-preguntan-en-familia-digo-muy-contento-con-el-curro': {
    description: 'Sonrío. Asiento. Cambio de tema rápido.',
  },
  'me-preguntan-que-tal-el-finde-y-no-tengo-nada-que-contar': {
    description: 'Solo dormí. Lloré. Vi una serie.',
  },
  'soy-siempre-el-ultimo-en-irme-y-nadie-me-lo-agradece': {
    description: 'Apago las luces. Cierro la puerta. Llego a casa a las 23h.',
  },

  // ===== v3-viajes (274) ================================================
  'me-pelee-con-mi-pareja-en-el-aeropuerto-antes-de-un-viaje-ro': {
    description: 'Empezamos las vacaciones sin hablarnos. Tres días.',
  },
  'me-puse-a-llorar-en-la-puerta-de-embarque-sin-saber-muy-bien': {
    description: 'Cinco minutos. Sin razón clara. La gente miraba.',
  },
  'cogi-un-ryanair-a-las-6am-habiendo-dormido-en-el-suelo-de-ba': {
    description: 'La maleta de almohada. Las luces nunca se apagan.',
  },
  'me-quede-en-tierra-por-overbooking-y-me-dieron-un-vale-para': {
    description: 'Doce euros. Para una hamburguesa. Sin patatas.',
  },
  'me-toco-el-bebe-llorando-al-lado-en-un-vuelo-de-8-horas': {
    description: 'Lloró 7 horas y 45 minutos. Los dejé un round.',
  },
  'el-bebe-que-lloraba-en-el-avion-esta-vez-era-el-mio': {
    description: 'Y miré a las otras personas pidiendo perdón en silencio.',
  },
  'vomite-en-la-bolsita-del-avion-en-pleno-aterrizaje': {
    description: 'No llegué al baño. La señora del lado lo entendió.',
  },
  'me-dormi-en-el-avion-y-me-desperte-con-la-gente-mirandome-po': {
    description: 'Roncaba con la boca abierta. El de al lado lo grabó.',
  },
  'pite-en-el-control-y-no-sabia-que-tenia-en-el-bolsillo': {
    description: 'Una llave perdida desde 2018. La conservé.',
  },
  'me-hicieron-tirar-las-cremas-en-seguridad-y-eran-las-caras': {
    description: 'Cuarenta euros a la basura. La cara de la agente: cero piedad.',
  },
  'llegue-al-aeropuerto-y-descubri-que-mi-pasaporte-estaba-cadu': {
    description: 'Caducado por dos meses. Me puse a llorar en facturación.',
  },
  'llegue-al-aeropuerto-sin-pasaporte-y-volvi-a-por-el-en-taxi': {
    description: 'Cuarenta euros. Llegué a la puerta de embarque corriendo.',
  },
  'me-hicieron-pesar-la-mochila-en-ryanair-y-me-cobraron-50-eur': {
    description: 'Cien gramos de más. Cincuenta euros. Recuerdo el momento.',
  },
  'cambiaron-la-puerta-de-embarque-y-cruce-el-aeropuerto-a-espr': {
    description: 'De la 1A a la 47C. Llegué con la lengua fuera.',
  },
  'me-cancelaron-el-vuelo-y-pase-4-horas-en-la-cola-del-mostrad': {
    description: 'Sin agua. Sin información. Solo gente con las maletas.',
  },
  'me-dormi-en-la-puerta-de-embarque-y-me-desperte-solo-en-la-s': {
    description: 'Cuando abrí los ojos, todos se habían ido sin avisarme.',
  },
  'me-toco-el-asiento-del-medio-entre-dos-senores-que-no-callar': {
    description: 'Me hablaron sin mirarme. Yo no respondí. Siguieron.',
  },
  'mi-bolso-no-entro-en-el-medidor-y-lo-meti-a-presion-con-la-r': {
    description: 'Sudaba. Sonreía. Pasé.',
  },
  'me-pillaron-en-aduana-llevando-un-trozo-de-jamon-en-la-malet': {
    description: 'Lo confiscaron. Treinta euros de jamón ibérico al cubo.',
  },
  'me-sellaron-mal-el-pasaporte-y-casi-no-entro-al-pais': {
    description: 'Tres horas con el oficial. Tres llamadas. Volví casi sin viaje.',
  },
  'me-equivoque-de-cola-en-el-control-de-pasaportes-y-me-toco-1': {
    description: 'La cola del lado iba al doble de velocidad.',
  },
  'perdieron-mi-maleta-y-llego-3-dias-despues-con-todo-dentro-m': {
    description: 'La camisa de boda. Mojada. Apesadumbrada. Olía a depósito.',
  },
  'recogi-la-maleta-en-la-cinta-y-estaba-rota-con-todo-asomando': {
    description: 'La cubrí con cinta de embalar. Volví así a casa.',
  },
  'cogi-la-maleta-de-otra-persona-y-me-di-cuenta-en-el-hotel': {
    description: 'Mismo color. Mismo peso. Distinto contenido.',
  },
  'perdi-el-ultimo-aerobus-a-las-1am-y-dormi-en-una-silla-del-a': {
    description: 'Cinco horas. Sin manta. Con el frío del aire condicionado.',
  },
  'me-toco-un-blablacar-de-6-horas-con-un-conductor-que-no-abri': {
    description: 'Solo dijo "hola" y "ya llegamos". Yo tampoco hablé.',
  },
  'sufri-700km-de-reggaeton-al-maximo-en-un-blablacar': {
    description: 'Pedí bajar dos veces. No le importó.',
  },
  'cogi-el-tren-equivocado-y-apareci-en-una-ciudad-que-ni-iba-a': {
    description: 'Pasé cuatro horas en un pueblo de cuatro casas.',
  },
  'hice-un-bus-nocturno-con-el-asiento-roto-que-no-se-reclinaba': {
    description: 'Doce horas en posición militar. Mi espalda lo recuerda.',
  },
  'me-subi-al-metro-en-otro-pais-sin-saber-como-se-compraba-el': {
    description: 'Salté el torno. Lo confieso. Nadie lo notó.',
  },
  'me-pillaron-sin-validar-el-billete-del-metro-y-me-clavaron-6': {
    description: 'Lo había validado. Pero la máquina no leyó. Pagué igual.',
  },
  'me-dieron-la-vuelta-larga-en-taxi-desde-el-aeropuerto-y-me-c': {
    description: 'Setenta euros por un trayecto de veinte. Sin ticket.',
  },
  'me-subi-al-uber-equivocado-y-no-me-di-cuenta-en-5-minutos': {
    description: 'El conductor tampoco. Llegamos a un sitio que no era.',
  },
  'me-di-cuenta-a-mitad-de-trayecto-que-el-conductor-olia-a-alc': {
    description: 'Pedí bajarme. Inventé un mensaje urgente.',
  },
  'llegue-a-un-airbnb-que-en-las-fotos-era-espectacular-y-era-u': {
    description: 'Las fotos eran del 2014. La realidad: humedades en el techo.',
  },
  'el-anfitrion-del-airbnb-me-hizo-un-tour-de-1-hora-por-la-cas': {
    description: 'Me explicó cómo funciona la lavadora con manual incluido.',
  },
  'reserve-airbnb-entero-y-resulto-que-el-anfitrion-vivia-en-la': {
    description: 'Salía del baño en pijama mientras yo desayunaba.',
  },
  'en-el-hostal-el-de-la-litera-de-arriba-roncaba-como-un-oso': {
    description: 'Tapones. Música. Almohada en la cara. Nada funcionó.',
  },
  'a-las-3am-alguien-encendio-la-luz-del-hostal-para-hacer-la-m': {
    description: 'Cuarenta y cinco minutos haciendo crujir el plástico.',
  },
  'en-el-hostal-estaban-follando-en-la-litera-de-al-lado-y-yo-f': {
    description: 'Veinte minutos. Sin sonido. Yo tampoco respiraba.',
  },
  'el-hotel-del-centro-no-tenia-agua-caliente-y-yo-banandome-en': {
    description: 'Pagué cuatro estrellas. Me duché en cuatro grados.',
  },
  'encontre-un-bicho-en-la-cama-del-hotel-a-la-1-de-la-manana': {
    description: 'Cucaracha. Tamaño industrial. Cambié de hotel a las 2am.',
  },
  'el-vecino-de-hotel-puso-la-tele-a-las-7am-y-no-habia-forma-d': {
    description: 'Telediario en el idioma local. A todo volumen. Cada día.',
  },
  'llegue-al-airbnb-a-las-11-de-la-noche-y-no-habia-papel-higie': {
    description: 'El supermercado cerrado. Improvisé con servilletas.',
  },
  'llegue-al-alojamiento-tarde-y-la-recepcion-estaba-cerrada-ha': {
    description: 'Dormí en el portal. Con la maleta de almohada.',
  },
  'no-encontre-la-llave-en-el-buzon-del-airbnb-y-dormi-en-el-po': {
    description: 'El anfitrión me respondió a las 9am. "Disculpa, lo olvidé".',
  },
  'se-me-mojo-la-tienda-entera-la-primera-noche-de-camping': {
    description: 'Saco de dormir incluido. Pasé la noche en el coche.',
  },
  'acampe-con-un-saco-que-no-daba-calor-y-me-mori-de-frio': {
    description: 'Tiritaba toda la noche. Pegado a las brasas del fuego.',
  },
  'me-perdi-en-el-bosque-siguiendo-google-maps-por-un-sendero-q': {
    description: 'Tres horas dando vueltas. Me cogió la noche.',
  },
  'hice-una-ruta-de-15km-con-zapatillas-urbanas-y-se-me-deshici': {
    description: 'Volví descalzo el último kilómetro. Las suelas en la mochila.',
  },
  'sali-a-hacer-una-ruta-sin-agua-y-casi-me-desmayo-a-mitad': {
    description: 'Treinta y cinco grados. Dos horas. Cero litros.',
  },
  'llegue-a-la-cumbre-y-se-me-apago-el-movil-justo-antes-de-la': {
    description: 'Llevé el cargador equivocado. Sin foto. Sin prueba.',
  },
  'me-torci-el-tobillo-el-primer-dia-y-me-pase-las-vacaciones-c': {
    description: 'Diez días esperando que desinflamara. Nunca llegó.',
  },
  'me-queme-tanto-al-sol-que-no-podia-ni-ponerme-la-camiseta': {
    description: 'Dormí desnudo. Crema cada hora. Tres días sin moverme.',
  },
  'volvi-de-la-playa-con-la-marca-de-la-camiseta-de-tirantes-pa': {
    description: 'En septiembre seguía la línea. En noviembre también.',
  },
  'pise-un-erizo-en-la-playa-y-pase-el-resto-del-viaje-cojeando': {
    description: 'Doce púas. Cinco días para sacarlas todas.',
  },
  'me-pico-una-medusa-el-primer-dia-y-se-acabo-el-plan-playa': {
    description: 'Una raya morada de 30 cm en el muslo. Una semana.',
  },
  'pille-una-diarrea-de-viaje-que-no-quiero-ni-recordar': {
    description: 'Tres días en el baño del hotel. Sin móvil. Sin esperanza.',
  },
  'comi-marisco-en-un-puesto-cualquiera-y-pase-la-noche-en-el-b': {
    description: 'Camarones. Dudosos. La barriga lo confirmó dos horas después.',
  },
  'vomite-en-un-tuk-tuk-por-la-mezcla-de-calor-comida-y-conducc': {
    description: 'El conductor ni paró. Yo tampoco le pedí.',
  },
  'pille-un-resfriado-bestia-por-el-aire-acondicionado-del-hote': {
    description: 'Dieciocho grados. Yo en pantalón corto. Tres días con fiebre.',
  },
  'con-el-jet-lag-me-hice-una-tortilla-francesa-a-las-3-de-la-m': {
    description: 'No sabía si era cena o desayuno. Comí dos.',
  },
  'pague-100-euros-por-una-cena-que-pensaba-que-costaba-30': {
    description: 'No leí la carta. Asumí. Pagué triple.',
  },
  'pedi-en-otro-idioma-y-me-trajeron-algo-que-ni-reconoci': {
    description: 'Casquería. Hígado. Algo. Lo comí por compromiso.',
  },
  'cai-en-una-trampa-para-turistas-y-me-cobraron-el-cubierto-a': {
    description: 'Por persona. Por servilleta. Por sentarse.',
  },
  'no-sabia-cuanta-propina-dejar-y-deje-el-doble-por-miedo': {
    description: 'El camarero salió detrás de mí para devolverla.',
  },
  'despues-de-5-dias-de-probar-comida-local-termine-en-un-mcdon': {
    description: 'En Roma. Con un Big Mac. Sin filtros y sin remordimientos.',
  },
  'cene-un-sandwich-de-gasolinera-de-un-pais-que-no-entendia-na': {
    description: 'Pan rancio. Queso del color del cartón. Era 1am.',
  },
  'pase-40-minutos-en-un-supermercado-intentando-comprar-cosas': {
    description: 'Yogur. Pan. Agua. Tres conceptos imposibles sin idioma.',
  },
  'pedi-un-cafe-con-leche-en-italia-a-las-5-de-la-tarde-y-me-mi': {
    description: 'El camarero me dijo "¿estás seguro?". Aún lo recuerda.',
  },
  'me-cobraron-12-libras-por-una-pinta-en-londres-y-disimule': {
    description: 'Sonreí. Pagué. Me fui sin pedir otra.',
  },
  'pedi-una-cerveza-en-baviera-y-me-trajeron-un-litro-que-no-me': {
    description: 'Tardé tres horas. Acabé en horizontal. La camarera asintió.',
  },
  'dije-que-aguantaba-el-picante-en-mexico-y-casi-lloro': {
    description: 'Tres salsas. Tres derrotas. Dos vasos de leche.',
  },
  'en-el-sushi-de-cinta-no-entendi-los-precios-y-pague-80-euros': {
    description: 'Cogí lo más colorido. Cada plato era el más caro.',
  },
  'pedi-el-vino-de-la-carta-sin-mirar-precio-y-costaba-200-euro': {
    description: 'Lo bebí muy despacio. Sabía igual que el de 12.',
  },
  'llegue-al-destino-sin-haber-cambiado-moneda-y-todo-cerrado': {
    description: 'Pagué un café con la última moneda que tenía.',
  },
  'el-cajero-del-extranjero-me-clavo-15-euros-de-comision-por-s': {
    description: 'Lo descubrí en el extracto. Tres meses después.',
  },
  'mi-banco-bloqueo-la-tarjeta-por-sospechar-fraude-justo-en-el': {
    description: 'En el supermercado. Llamada urgente desde una cabina.',
  },
  'la-revolut-no-me-funciono-y-tuve-que-pagar-todo-con-la-tarje': {
    description: 'Doce comisiones. Una factura del banco infinita.',
  },
  'perdi-la-cartera-en-la-estacion-de-tren-y-no-volvi-a-verla': {
    description: 'DNI. Tarjetas. Doscientos euros en cash. Adiós.',
  },
  'me-robaron-la-mochila-en-un-bar-mientras-pedia-la-segunda-ce': {
    description: 'Cinco minutos. Eso fue todo. Móvil incluido.',
  },
  'un-carterista-me-saco-el-movil-del-bolsillo-en-el-metro-y-no': {
    description: 'Lo busqué. No estaba. Lo asumí.',
  },
  'me-hicieron-la-estafa-de-la-pulsera-en-plena-calle-y-pague': {
    description: 'Diez euros por una pulsera que se rompió en una hora.',
  },
  'pague-100-euros-por-una-bici-de-alquiler-que-se-rompio-en-el': {
    description: 'La cadena se salió. La empresa no respondió. Cien al aire.',
  },
  'mi-primera-noche-de-erasmus-la-pase-llorando-en-la-habitacio': {
    description: 'Sin amigos. Sin idioma. Con la maleta abierta.',
  },
  'fui-a-mi-primera-clase-de-erasmus-y-no-entendi-ni-una-palabr': {
    description: 'Asentí dos horas. Salí más perdido que cuando entré.',
  },
  'en-el-erasmus-me-alimente-de-pasta-con-tomate-durante-un-mes': {
    description: 'Cuatro euros la bolsa. Treinta y un cenas iguales.',
  },
  'en-mi-piso-de-erasmus-la-cocina-parecia-una-zona-de-guerra-c': {
    description: 'Platos por todas partes. Nadie limpiaba. Yo tampoco.',
  },
  'sali-de-fiesta-en-erasmus-perdi-las-llaves-y-dormi-en-el-rel': {
    description: 'Mis compañeros me encontraron por la mañana. Risas eternas.',
  },
  'llore-en-el-vuelo-de-vuelta-del-erasmus-mirando-por-la-venta': {
    description: 'Tres horas. Sin película. Solo nubes y nostalgia.',
  },
  'hice-un-mes-de-mochilero-con-tres-camisetas-que-ya-no-olian': {
    description: 'Las lavé en lavabos de hostales. No fue suficiente.',
  },
  'me-lie-con-alguien-en-el-hostal-y-al-dia-siguiente-cogimos-v': {
    description: 'No le pedí Instagram. Él tampoco. Quedó así.',
  },
  'conoci-a-alguien-en-un-hostal-y-seguimos-hablando-4-anos-des': {
    description: 'Vive en Berlín. Yo en Madrid. Nos llamamos cada cumple.',
  },
  'cene-yo-solo-en-la-cocina-del-hostel-mientras-todos-hacian-p': {
    description: 'Comí pasta del Lidl. Todos pidieron en el bar.',
  },
  'mi-pareja-y-yo-nos-peleamos-por-el-mapa-y-dejamos-de-hablarn': {
    description: 'En las callejuelas de un pueblo. Tres horas en silencio.',
  },
  'en-vacaciones-queriamos-cosas-opuestas-y-acabamos-cada-uno-p': {
    description: 'Yo museos. Él playa. Quedamos para cenar y casi cortamos.',
  },
  'viaje-con-un-grupo-de-amigos-y-descubri-que-uno-era-un-plomo': {
    description: 'Lo dijimos al cuarto día. Volvió antes que el resto.',
  },
  'en-el-grupo-el-tipico-que-llevaba-un-excel-con-todos-los-gas': {
    description: 'Con cinco decimales. Un Bizum por dos cervezas.',
  },
  'en-el-viaje-con-amigos-siempre-habia-uno-que-se-escapaba-a-p': {
    description: 'En la cuenta final descubrimos que llevaba cinco días sin pagar.',
  },
  'me-coincidio-mi-cumpleanos-en-pleno-viaje-y-nadie-se-acordo': {
    description: 'A las 22h alguien lo vio en Instagram. Pidieron una tarta.',
  },
  'en-la-luna-de-miel-nos-peleamos-al-bajar-del-avion': {
    description: 'Por las maletas. Veinte minutos. Empezó así la luna.',
  },
  'viaje-con-mis-padres-a-roma-y-acabe-buscando-excusas-para-es': {
    description: 'Inventé que necesitaba comprar un libro. Dos horas paseando solo.',
  },
  'el-domingo-de-vuelta-del-viaje-pense-en-pedir-la-baja-para-n': {
    description: 'No la pedí. Lloré toda la mañana en la oficina.',
  },
  'se-cancelo-el-vuelo-y-dormi-8h-en-una-silla-rigida-del-aerop': {
    description: 'Sin manta. Sin almohada. Sin colchón. Sin dignidad.',
  },
  'pase-la-noche-en-el-aeropuerto-cenando-un-burger-king-a-las': {
    description: 'Catorce euros. Frío. Solo en una mesa para cuatro.',
  },
  'llegue-2-horas-antes-al-aeropuerto-y-aun-asi-casi-pierdo-el': {
    description: 'Cola de seguridad: una hora. Cola de pasaportes: media.',
  },
  'imprimi-la-tarjeta-de-embarque-en-blanco-y-negro-y-casi-me-h': {
    description: 'Veinte euros me querían cobrar. Casi lo aceptan.',
  },
  'pague-extra-por-ventanilla-y-me-pase-el-vuelo-durmiendo-con': {
    description: 'Ocho euros perdidos. Las nubes pasaron sin mí.',
  },
  'cogi-pasillo-y-la-del-medio-se-mareo-toda-encima': {
    description: 'No me avisó. Cinco horas oliendo.',
  },
  'pedi-el-menu-especial-del-avion-y-vino-una-cosa-imposible-de': {
    description: 'Ensalada con plástico. Pollo gomoso. Yogur sin cuchara.',
  },
  'la-azafata-me-tiro-el-cafe-encima-y-me-pase-el-vuelo-con-el': {
    description: 'Me pidió perdón. Me regaló dos miniaturas.',
  },
  'estuve-en-cola-del-bano-del-avion-30-minutos-y-me-lo-aguante': {
    description: 'Aterricé corriendo. La gente me cedía el paso.',
  },
  'me-puse-a-llorar-viendo-una-peli-en-el-avion-rodeado-de-gent': {
    description: 'Era una peli mediocre. Pero el contexto me pudo.',
  },
  'aplaudi-cuando-aterrizo-el-avion-y-me-di-cuenta-tarde-de-la': {
    description: 'Solo aplaudimos cuatro. La cabina hizo silencio incómodo.',
  },
  'en-una-turbulencia-fuerte-me-puse-a-rezar-sin-ser-creyente': {
    description: 'Padre nuestro completo. Lo aprendí en el momento.',
  },
  'me-maree-tanto-en-un-coche-que-tuve-que-parar-y-vomitar-en-l': {
    description: 'Dos horas de curvas. Cuatro paradas. Una indigestión.',
  },
  'me-maree-en-un-autobus-de-montana-y-vomite-unas-lentejas-que': {
    description: 'Me las había comido tres días antes. Aún recuerdo el sabor.',
  },
  'en-el-ferry-me-pase-toda-la-travesia-tumbado-en-el-suelo-del': {
    description: 'Doce horas. Mareado. Sin moverme.',
  },
  'conduje-en-un-pais-con-el-volante-al-otro-lado-y-casi-me-mat': {
    description: 'Las rotondas son enemigas. Especialmente al revés.',
  },
  'eche-gasolina-equivocada-en-un-coche-de-alquiler-en-otro-pai': {
    description: 'Diésel en un gasolina. Doscientos euros de grúa.',
  },
  'me-llego-una-multa-del-coche-de-alquiler-4-meses-despues-por': {
    description: 'Una raya que ya estaba. Cobrada al doble.',
  },
  'me-llevaron-el-coche-con-la-grua-en-el-primer-dia-de-vacacio': {
    description: 'Aparqué donde no debía. Dos horas para recuperarlo.',
  },
  'me-cobraron-80-euros-de-parking-porque-no-entendi-como-se-pa': {
    description: 'La máquina solo aceptaba moneda local. La descubrí tarde.',
  },
  'llegue-al-monumento-estrella-del-viaje-y-estaba-cerrado-los': {
    description: 'Vi el cartel desde fuera. Lloré por dentro.',
  },
  'hice-3-horas-de-cola-para-un-museo-que-me-aburrio-en-20-minu': {
    description: 'Salí mintiendo: "muy interesante". A nadie engañé.',
  },
  'pase-una-tarde-entera-en-un-museo-y-solo-recuerdo-el-dolor-d': {
    description: 'No me preguntes por las obras. Recuerdo los bancos.',
  },
  'hice-la-foto-sujetando-la-torre-de-pisa-y-me-sigo-arrepintie': {
    description: 'La subí en 2014. Sigue ahí. Sin borrar.',
  },
  'pague-entrada-para-una-atraccion-solo-para-el-insta-y-no-ent': {
    description: 'Hice la foto desde fuera. Me ahorré el museo.',
  },
  'pase-2-horas-montando-una-foto-de-instagram-en-la-playa': {
    description: 'Cien intentos. La que subí no era la mejor.',
  },
  'volvi-con-50-imanes-de-la-nevera-y-no-se-ni-donde-compre-la': {
    description: 'Mi nevera parece una galería de minimuseos.',
  },
  'me-compre-un-souvenir-de-ceramica-y-llego-a-casa-hecho-anico': {
    description: 'Lo metí en la maleta sin envolver. Confié.',
  },
  'me-compre-la-camiseta-de-i-love-ny-y-no-me-la-he-puesto-nunc': {
    description: 'Está en el cajón desde 2019. Esperando.',
  },
  'volvi-con-una-bolsa-de-souvenirs-tan-pesada-que-me-cobraron': {
    description: 'Cuarenta euros por exceso. Eran imanes.',
  },
  'me-duche-en-el-hostel-y-me-senti-mas-solo-que-en-toda-mi-vid': {
    description: 'Agua tibia. Azulejos rotos. Llorar también.',
  },
  'pedi-mesa-para-uno-en-un-restaurante-caro-y-disfrute-como-nu': {
    description: 'Sin móvil. Sin libro. Solo el plato y yo.',
  },
  'hice-match-en-tinder-en-otro-pais-y-quede-con-un-desconocido': {
    description: 'Me llevó a un mercado nocturno. Cinco horas de tour.',
  },
  'quede-con-alguien-de-grindr-en-otro-pais-y-luego-me-arrepent': {
    description: 'Aparté la cortina. Vi su salón. Inventé una llamada.',
  },
  'me-lie-con-alguien-en-el-viaje-y-al-volver-llore-en-el-avion': {
    description: 'No me dio su nombre real. Lo descubrí buscando.',
  },
  'llame-a-mis-padres-llorando-desde-otro-pais-por-una-tonteria': {
    description: 'Era un Bizum mal hecho. Mi madre suspiró tres veces.',
  },
  'me-llego-una-factura-de-100-euros-de-roaming-sin-haber-hecho': {
    description: 'Solo había abierto WhatsApp. Una vez. O eso creía.',
  },
  'el-hotel-decia-wifi-gratis-y-era-de-pago-a-15-euros-la-hora': {
    description: 'Lo descubrí cuando intenté ver Instagram a la 1am.',
  },
  'intente-ver-netflix-en-otro-pais-y-la-vpn-no-me-funcionaba': {
    description: 'Tres horas configurando. Mejor me leí un libro.',
  },
  'llegue-al-hotel-con-el-cargador-equivocado-para-el-tipo-de-e': {
    description: 'El móvil al 4%. Adaptador a 15 euros. Cero negociación.',
  },
  'compre-un-adaptador-de-enchufe-en-el-aeropuerto-a-25-euros': {
    description: 'Lo encontré por 2 al día siguiente. Sin reembolso.',
  },
  'se-me-apago-el-movil-en-una-ciudad-nueva-y-no-sabia-volver-a': {
    description: 'Dos horas dando vueltas. Pregunté por gestos.',
  },
  'en-un-taxi-no-me-acordaba-del-nombre-del-hotel-y-di-vueltas': {
    description: 'Solo recordaba que era azul. Y que estaba cerca.',
  },
  'use-un-mapa-de-papel-del-hostal-y-aun-asi-me-perdi': {
    description: 'No sabía orientarlo. El norte se me escapaba.',
  },
  'pague-un-tour-por-adelantado-y-al-final-no-me-apetecia-y-no': {
    description: 'Cuarenta euros tirados. Dormí hasta las 11.',
  },
  'cai-en-un-tour-donde-el-guia-no-callo-en-3-horas-y-solo-quer': {
    description: 'Hablaba sin parar. Y mal.',
  },
  'en-un-free-tour-me-senti-obligado-a-poner-20-euros-de-propin': {
    description: 'El guía pasó la gorra. Yo el primero. Por vergüenza.',
  },
  'me-quede-dormido-en-un-bus-turistico-y-pase-dos-veces-por-lo': {
    description: 'El conductor me despertó al hacer la última vuelta.',
  },
  'se-me-cayeron-las-gafas-haciendo-snorkel-y-se-las-llevo-el-m': {
    description: 'Las graduadas. Pasé el viaje viendo siluetas.',
  },
  'en-mi-primera-inmersion-de-buceo-me-dio-un-ataque-de-panico': {
    description: 'A 5 metros. Subí a la superficie sin avisar.',
  },
  'cogi-un-paddle-surf-y-me-aleje-tanto-que-no-sabia-como-volve': {
    description: 'Tres horas remando contra viento. Lloré.',
  },
  'volque-el-kayak-con-el-movil-dentro-y-se-acabo-el-viaje': {
    description: 'Tres mil fotos. Todas perdidas. Sin backup.',
  },
  'me-monte-en-un-camello-en-marruecos-y-me-cai-en-el-primer-pa': {
    description: 'Frente al guía. Frente al grupo. Frente a la cámara.',
  },
  'monte-un-elefante-en-tailandia-y-volvi-con-cargo-de-concienc': {
    description: 'Lo defendí en el momento. Lo enterré después.',
  },
  'un-perro-me-mordio-en-otro-pais-y-tuve-que-ir-a-urgencias-po': {
    description: 'Cuatro pinchazos. Tres horas. Seguro privado.',
  },
  'volvi-del-viaje-con-las-piernas-hechas-un-campo-de-mosquitos': {
    description: 'Cuarenta picaduras. Conté.',
  },
  'pille-piojos-en-un-hostal-y-me-entere-2-semanas-despues': {
    description: 'En la cabeza de mi sobrina. Lo conecté tarde.',
  },
  'pille-sarna-en-un-hostal-del-sudeste-asiatico-y-no-se-lo-des': {
    description: 'Picaba sin parar. Tres semanas de tratamiento.',
  },
  'me-dieron-a-probar-orina-de-vaca-en-india-por-una-broma-de-u': {
    description: 'Dijo que era zumo. Confié. Bebí.',
  },
  'use-un-bano-comun-en-asia-y-aun-sueno-con-esa-experiencia': {
    description: 'Suelo mojado. Olor industrial. Sin papel.',
  },
  'me-quede-sin-papel-en-un-bano-publico-de-un-pais-que-solo-us': {
    description: 'Aprendí. Improvisé. No quiero hablar de ello.',
  },
  'pase-la-noche-en-el-desierto-y-la-arena-se-me-metio-hasta-en': {
    description: 'Aún encuentro arena en mi mochila. Cuatro años después.',
  },
  'pense-que-el-desierto-era-calor-y-casi-me-congelo-por-la-noc': {
    description: 'Llevé pantalón corto. Dormí con cuatro mantas.',
  },
  'llegue-a-cusco-y-casi-me-desmayo-por-el-mal-de-altura': {
    description: 'Mate de coca. Dos pastillas. Dos días en cama.',
  },
  'llegue-a-machu-picchu-y-estaba-todo-cubierto-de-niebla': {
    description: 'Pagué por el cielo y vi una nube blanca.',
  },
  'vi-las-cataratas-y-volvi-completamente-empapado-al-hotel': {
    description: 'El chubasquero no aguantó. Mi humor tampoco.',
  },
  'pague-un-viaje-a-laponia-para-ver-auroras-y-no-vi-ni-una': {
    description: 'Cinco noches mirando al cielo. Cero verde.',
  },
  'vi-la-torre-eiffel-en-persona-y-me-decepciono-un-poco': {
    description: 'Esperaba magia. Vi metal. Y mucha gente.',
  },
  'llegue-a-la-mona-lisa-y-era-mucho-mas-pequena-de-lo-que-pens': {
    description: 'Tres horas de cola para ver un cuadro de A4.',
  },
  'me-robaron-en-las-ramblas-siendo-turista-en-mi-propio-pais': {
    description: 'Andaba como guiri. Lo notaron rápido.',
  },
  'me-perdi-en-san-isidro-siendo-de-madrid-de-toda-la-vida': {
    description: 'Cuarenta minutos. Pregunté a una guiri.',
  },
  'perdi-al-grupo-en-ibiza-a-las-4am-y-apareci-al-dia-siguiente': {
    description: 'Sin móvil. Sin ropa. Sin recuerdos.',
  },
  'acabe-en-una-calle-de-benidorm-cantando-con-guiris-borrachos': {
    description: 'A las 4am. Todos en pantalón corto. Todos cantando.',
  },
  'fui-a-un-festival-de-verano-y-llovio-los-4-dias-seguidos': {
    description: 'Barro hasta las rodillas. Botas perdidas. Móvil muerto.',
  },
  'perdi-la-cartera-en-un-festival-y-aun-asi-segui-bailando': {
    description: 'Sin DNI. Sin tarjeta. Pero con buena energía.',
  },
  'se-me-volo-la-tienda-del-camping-en-un-festival-con-mis-cosa': {
    description: 'A las 5am. Viento bestia. Encontré tres cosas.',
  },
  'volvi-de-un-festival-con-0-fotos-de-mi-y-200-de-mis-amigos': {
    description: 'Y todas eran del DJ que solo escuché yo.',
  },
  'hice-un-finde-en-otra-ciudad-sin-dormir-practicamente-nada': {
    description: 'Tres horas en el AVE. Tres horas en el bar. Cero cama.',
  },
  'hice-un-puente-improvisado-y-volvi-con-la-mochila-mas-pesada': {
    description: 'Llené todo. La cinta del aeropuerto se quejó.',
  },
  'en-vacaciones-conteste-un-mail-del-curro-y-me-arrepenti-inme': {
    description: 'Me llamaron al día siguiente. Tres horas de reunión.',
  },
  'mi-jefe-me-llamo-estando-en-la-playa-y-disimule-que-estaba-e': {
    description: 'Me metí en una sombrilla. Hablé treinta minutos. Sudé.',
  },
  'hice-la-tipica-foto-de-pies-en-la-piscina-y-luego-me-dio-ver': {
    description: 'La puse en un álbum privado. Sigue ahí.',
  },
  'me-lie-con-alguien-en-un-resort-todo-incluido-y-nunca-lo-con': {
    description: 'Mi pareja sigue sin saberlo. Han pasado siete años.',
  },
  'aproveche-tanto-la-pulsera-del-todo-incluido-que-vomite-el-s': {
    description: 'Quince mojitos. Dos piñas coladas. Cero arrepentimiento.',
  },
  'hice-un-crucero-y-los-3-primeros-dias-estuve-mareado-en-la-c': {
    description: 'Pagué cuatro mil euros por dormir.',
  },
  'en-un-crucero-comi-en-el-buffet-4-veces-al-dia-y-subi-5-kilo': {
    description: 'Y eso que vomité dos veces.',
  },
  'hice-un-tren-nocturno-y-mi-compartimiento-olia-a-pies-durant': {
    description: 'Cuatro pasajeros. Cero ventana abierta.',
  },
  'me-hice-un-interrail-y-llegue-a-estar-2-dias-sin-ducharme': {
    description: 'Hostales sin agua caliente. Trenes sin lavabo.',
  },
  'en-un-interrail-perdi-un-tren-por-30-segundos-y-se-me-fue-to': {
    description: 'Vi cómo se iba sin mí. Quince días para reorganizar.',
  },
  'en-el-aeropuerto-cambiamos-de-destino-y-compramos-otro-vuelo': {
    description: 'Sin pensarlo. Sin maleta extra. Acabamos en otro continente.',
  },
  'en-roma-comi-pasta-los-3-dias-y-aun-asi-pedi-mas-para-llevar': {
    description: 'Carbonara. Amatriciana. Cacio. Volví con dos kilos más.',
  },
  'me-perdi-en-shibuya-siguiendo-un-mapa-que-no-entendia': {
    description: 'Caracteres japoneses. Yo girando sobre mí mismo.',
  },
  'en-seul-entre-a-un-norebang-yo-solo-y-cante-como-si-nadie-me': {
    description: 'Tres horas. Veinte canciones. Vergüenza cero.',
  },
  'comi-pizza-sentado-en-el-bordillo-en-nueva-york-como-en-las': {
    description: 'Cinco euros. Sin servilletas. Sin remordimientos.',
  },
  'llore-delante-del-castillo-de-disney-teniendo-28-anos': {
    description: 'Sentí mi infancia volver. Y luego irse otra vez.',
  },
  'hice-3-horas-de-cola-para-una-atraccion-que-duro-90-segundos': {
    description: 'Repetí. Otras tres horas. Otros 90 segundos.',
  },
  'me-pase-en-un-coffeeshop-de-amsterdam-y-dormi-en-un-parque': {
    description: 'Dos horas tumbado. Frío bestia. Pero feliz.',
  },
  'en-praga-me-bebi-mas-litros-de-cerveza-que-de-agua-en-una-se': {
    description: 'La cerveza era más barata que el agua. No es broma.',
  },
  'fui-a-los-banos-termales-de-budapest-con-la-peor-resaca-de-m': {
    description: 'Treinta y ocho grados. Yo a punto de desmayarme.',
  },
  'estuve-12-horas-seguidas-en-una-discoteca-de-berlin-y-casi-m': {
    description: 'Salí a las 11am con luz de día. Berghain.',
  },
  'hice-80-fotos-del-tranvia-de-lisboa-y-subi-solo-una': {
    description: 'Las otras 79 siguen en el carrete. Sin ver.',
  },
  'un-camarero-parisino-me-trato-fatal-y-me-fui-sin-tomarme-la': {
    description: 'Sin propina. Sin mirar atrás. Pagué fuera.',
  },
  'volvi-de-australia-con-tal-jet-lag-que-tarde-semanas-en-recu': {
    description: 'Me dormía a las 6pm. Me despertaba a las 3am.',
  },
  'volvi-de-bali-diciendo-que-era-otra-persona-y-dure-3-dias-as': {
    description: 'Yoga. Meditación. Crudismo. Hasta que vi un Burger King.',
  },
  'hice-4-amigos-intimos-en-tailandia-y-no-he-vuelto-a-hablar-c': {
    description: 'Solo nos seguimos en Instagram. Solo eso.',
  },
  'alquile-una-moto-en-vietnam-y-me-cai-antes-de-salir-del-park': {
    description: 'Tres metros. Sin daños. Mucha vergüenza.',
  },
  'el-grupo-de-whatsapp-del-viaje-murio-a-los-3-dias-de-volver': {
    description: 'El último mensaje: "qué buen viaje 🥹". Silencio total.',
  },
  'tengo-fotos-de-un-viaje-en-el-movil-sin-organizar-desde-hace': {
    description: 'Cuatro mil setecientas. Sin álbum. Sin descripción.',
  },
  'compre-un-album-de-fotos-para-imprimir-el-viaje-y-sigue-vaci': {
    description: 'Veinticinco euros. En el cajón. Esperando.',
  },
  'volvi-de-viaje-y-al-dia-siguiente-fui-a-currar-como-si-no-hu': {
    description: 'A las 9am sentado en mi mesa. La maleta sin deshacer.',
  },
  'el-domingo-de-vuelta-del-viaje-me-sente-en-el-sofa-a-mirar-l': {
    description: 'Tres horas. Sin moverme. Solo procesando.',
  },
  'volvi-obsesionado-con-un-restaurante-y-se-lo-conte-a-todo-el': {
    description: 'Mis amigos lo escucharon tres veces cada uno.',
  },
  'compre-una-guia-de-viaje-en-papel-y-no-la-abri-ni-una-vez': {
    description: 'Veinte euros. Página 1. La devolví al cajón.',
  },
  'segui-una-guia-vieja-y-los-sitios-ya-no-existian': {
    description: 'El restaurante "imprescindible" cerrado desde 2018.',
  },
  'hice-una-lista-de-cosas-para-ver-y-no-marque-ni-la-mitad': {
    description: 'Cincuenta sitios. Vi seis. Recordé tres.',
  },
  'no-prepare-el-viaje-y-acabe-pagando-todo-el-doble-por-improv': {
    description: 'Hostales sin reserva. Trenes en clase business sin querer.',
  },
  'volvi-del-viaje-pesando-2-kilos-mas-y-me-costo-un-mes-quitar': {
    description: 'La pasta italiana. La cerveza alemana. La culpa española.',
  },
  'jure-no-hacer-fotos-turisticas-y-volvi-con-700-identicas-a-l': {
    description: 'Misma Torre Eiffel. Misma Mona Lisa. Mismo Coliseo.',
  },
  'pague-un-tour-de-grupo-y-me-pase-el-dia-evitando-hablar-con': {
    description: 'Auriculares puestos. Distancia prudente. Misión cumplida.',
  },
  'hice-un-presupuesto-y-al-final-me-gaste-el-doble': {
    description: 'Mil estimados. Dos mil reales. Tarjeta de crédito al rescate.',
  },
  'me-pase-un-mes-pagando-con-tarjeta-de-credito-un-viaje-de-fi': {
    description: 'Tres días en Lisboa. Cuatro pagos en tarjeta.',
  },
  'volvi-del-viaje-con-la-cuenta-a-cero-y-aun-quedaban-10-dias': {
    description: 'Comí lentejas diez días. Pagué Bizums no cobrados.',
  },
  'jure-no-viajar-mas-en-6-meses-y-a-los-3-ya-estaba-mirando-vu': {
    description: 'Skyscanner es droga.',
  },
  'pase-un-domingo-entero-buscando-vuelos-a-cualquier-sitio-sin': {
    description: 'Cuatro horas. Veinte ciudades. Cero compras.',
  },
  'vi-un-error-fare-brutal-y-dude-tanto-que-cuando-fui-a-compra': {
    description: 'Cien euros a Tokio. Lo dudé cinco minutos. Fatal.',
  },
  'mis-amigos-cancelaron-a-ultima-hora-y-me-fui-de-viaje-yo-sol': {
    description: 'El mejor viaje de mi vida. Lo confieso.',
  },
  'hice-mi-primer-viaje-solo-y-me-cambio-un-poco-la-cabeza': {
    description: 'No volví igual. Ni quise volver igual.',
  },
  'cene-yo-solo-en-la-barra-de-un-bar-leyendo-un-libro-como-un': {
    description: 'Sentido pleno. Cero remordimiento.',
  },
  'en-un-viaje-le-mande-un-mensaje-borracho-a-mi-ex-y-al-dia-si': {
    description: 'Borrado al día siguiente. Pero ya leído.',
  },
  'me-pase-el-viaje-montando-stories-de-instagram-en-vez-de-mir': {
    description: 'Volví con quinientas stories. Cero recuerdos propios.',
  },
  'llovio-toda-la-semana-del-viaje-y-me-lo-pase-en-el-hotel-vie': {
    description: 'Pagué quinientos euros por una semana de Netflix.',
  },
  'en-un-viaje-de-trabajo-me-escape-del-grupo-de-la-empresa-par': {
    description: 'Una caña. Sin ellos. Suspiro.',
  },
  'tuve-que-ir-con-corbata-a-una-presentacion-en-otro-pais-y-ol': {
    description: 'Compré una en H&M. Veinticinco euros para diez minutos.',
  },
  'hice-una-videollamada-de-trabajo-desde-un-hotel-en-pijama-y': {
    description: 'Camisa arriba. Bañador abajo. Cliente en directo.',
  },
  'vole-en-una-compania-low-cost-y-el-asiento-estaba-literalmen': {
    description: 'No reclinaba. No giraba. Funcionaba a medias.',
  },
  'espere-45-minutos-en-la-cinta-de-equipajes-y-mi-maleta-no-sa': {
    description: 'Vino tres días después. Con dos camisetas menos.',
  },
  'hice-2-horas-de-cola-para-recoger-el-coche-de-alquiler': {
    description: 'Cuando llegó mi turno me dieron uno distinto al reservado.',
  },
  'me-cobraron-una-raya-del-coche-de-alquiler-que-ya-estaba-ant': {
    description: 'Sin foto previa. Cien euros perdidos.',
  },
  'el-deposito-del-coche-de-alquiler-tardo-3-meses-en-volver-a': {
    description: 'Llamé seis veces. Cada vez una excusa distinta.',
  },
  'mi-dni-estaba-caducado-y-descubrirlo-en-el-aeropuerto-fue-un': {
    description: 'Comisaría a las 6am. Llegué al embarque por los pelos.',
  },
  'firme-un-papel-para-un-deporte-extremo-sin-entender-nada-y-l': {
    description: 'Estaba en otro idioma. Salté igual.',
  },
  'salte-en-paracaidas-y-grite-y-llore-en-el-cielo-como-un-nino': {
    description: 'El instructor lo grabó. Lo veo cada año.',
  },
  'me-hice-100-km-para-hacer-puenting-y-al-borde-no-pude-saltar': {
    description: 'Pagué cincuenta euros. Volví caminando.',
  },
  'mi-primer-dia-de-esqui-acabe-bajando-una-pista-azul-de-culo': {
    description: 'La gente se reía. Pasé. Llegué viva.',
  },
  'me-fracture-la-muneca-el-primer-dia-probando-snowboard': {
    description: 'Cuarenta minutos en pista. Tres meses con escayola.',
  },
  'me-cai-del-trineo-de-perros-en-laponia-y-me-arrastraron-5-me': {
    description: 'Los perros no pararon. Yo sí me paré. Dolió.',
  },
  'pague-por-dormir-en-un-iglu-y-no-pegue-ojo-del-frio-que-pase': {
    description: 'Doscientos euros. Quince grados bajo cero. Sin sueño.',
  },
  'reserve-un-glamping-y-era-un-camping-normal-con-luces-de-fer': {
    description: 'Las fotos engañan. La realidad olía a humedad.',
  },
  'dormi-en-una-yurta-y-un-bicho-paso-por-encima-de-mi-cara': {
    description: 'Lo sentí. No lo vi. Mejor así.',
  },
  'hice-3-vuelos-seguidos-y-llegue-al-destino-sin-saber-que-dia': {
    description: 'Treinta horas en aviones. Cero idea del día.',
  },
  'llegue-a-mi-destino-el-dia-de-mi-cumpleanos-y-nadie-me-felic': {
    description: 'En otro huso horario. Lo recordaron tarde.',
  },
  'perdi-un-vuelo-por-una-resaca-brutal-del-dia-anterior': {
    description: 'No sonó la alarma. Mejor: la apagué dormida.',
  },
  'corri-por-el-aeropuerto-como-en-las-peliculas-y-aun-asi-lleg': {
    description: 'La puerta cerrada por treinta segundos.',
  },
  'en-un-viaje-me-toco-el-mismo-asiento-de-ida-y-de-vuelta-sin': {
    description: 'Mismo número. Misma ventanilla. Sin elegir.',
  },
  'conoci-a-mi-pareja-actual-en-un-viaje-y-todavia-no-me-lo-cre': {
    description: 'Llevamos cinco años. Todavía no lo cuento sin sonreír.',
  },
  'a-los-30-descubri-que-ya-no-me-gusta-volar-y-me-da-ansiedad': {
    description: 'Antes era de ventanilla. Ahora me tomo una pastilla.',
  },
  'tome-pastillas-para-dormir-en-un-vuelo-y-desperte-con-la-car': {
    description: 'Babas en la mejilla. Pelo levantado. Compañero risueño.',
  },
  'compre-billetes-baratos-saltandome-el-primer-tramo-y-casi-me': {
    description: 'La aerolínea no perdona. Lo aprendí caro.',
  },
  'perdi-la-llave-del-hotel-y-tuve-que-despertar-a-recepcion-a': {
    description: 'El recepcionista me odió por una semana.',
  },
  'me-quede-encerrado-en-el-bano-de-un-restaurante-en-otro-idio': {
    description: 'El cerrojo no giraba. Veinte minutos golpeando.',
  },
  'perdi-el-ultimo-bus-al-aeropuerto-y-un-taxi-me-cobro-el-viaj': {
    description: 'Doscientos euros. Para un trayecto de quince.',
  },
  'me-llego-un-email-importante-de-la-aerolinea-a-spam-y-casi-p': {
    description: 'Lo descubrí en el aeropuerto. Cambio de puerta a la otra punta.',
  },
  'reserve-un-hotel-sin-aire-acondicionado-en-pleno-julio-en-el': {
    description: 'Cuarenta grados. Ventilador del año 90. Cero pegadas.',
  },
  'no-entendi-lo-que-pedia-la-camarera-y-le-dije-que-si-a-todo': {
    description: 'Me trajeron tres platos extras. Comí todo.',
  },
  'pague-15-euros-por-una-ducha-en-el-aeropuerto-y-volvi-a-sent': {
    description: 'Quince euros mejor invertidos de mi vida.',
  },
  'pague-una-sala-vip-del-aeropuerto-y-se-acabo-la-comida-5-min': {
    description: 'Sesenta euros. Tres galletas. Cero esperanza.',
  },
  'compre-una-sim-en-otro-pais-y-no-me-funciono-hasta-el-ultimo': {
    description: 'Seis días sin internet. El séptimo, conexión perfecta.',
  },
  'me-cambiaron-el-vuelo-cancelado-a-otra-aerolinea-peor-y-sin': {
    description: 'Lo descubrí en facturación. Otra aerolínea. Otra terminal.',
  },
  'llegue-corriendo-a-la-puerta-de-embarque-cuando-estaban-cerr': {
    description: 'La azafata me miró sin compasión. Pero abrió.',
  },
  'no-imprimi-el-billete-de-ryanair-y-me-cobraron-60-euros-en-m': {
    description: 'Sesenta euros por un papel. Lección aprendida.',
  },
  'estando-de-viaje-pense-en-serio-si-volvia-o-me-quedaba-a-viv': {
    description: 'Tres días dándole vueltas. Volví. A veces dudo.',
  },

  // ===== v2-part-1 (234 unique, originales filtrados por el script) ====
  'cunado-cripto': { description: 'Con gráficos. Sin saber qué es Bitcoin.' },
  'padre-llorando-serie': { description: 'No lo admitió. Pero lo vimos.' },
  'madre-captura-camara': { description: 'Foto del WhatsApp. Con flash.' },
  'padre-chiste-navidad': { description: 'Mismo chiste. Misma risa propia. Cada año.' },
  'grupo-sin-mi': { description: 'Lo descubrí cuando alguien lo nombró delante.' },
  'cunado-futbol': { description: 'Sus análisis tácticos rivalizan con los de Marca.' },
  'abuela-stickers': { description: 'Manda 12 conejitos. No le respondes.' },
  'madre-facebook': { description: 'Comenta "guapa hija". Lo ven mis seguidores.' },
  'padre-whatsapp-mayusculas': { description: 'GRITA SIN SABER QUE GRITA.' },
  'tio-conspiraciones': { description: 'Llevo aprendiendo de la NASA en tres Navidades.' },
  'prima-instagram': { description: 'Sigo esperando el follow back de 2021.' },
  'abuelo-movil-nuevo': { description: 'Cada modelo nuevo es de otro idioma.' },
  'madre-meme-desfasado': { description: 'Un minion. Una frase de Coelho. Un buenos días.' },
  'hermano-wifi': { description: 'Cuando funciona, no tengo hermano.' },
  'madre-llama-novia-exnovia': { description: 'Por su nombre. Cinco años después.' },
  'madre-reenviar-cadena': { description: 'Si no la reenvío, me caerá una desgracia.' },
  'hermana-spotify-familia': { description: 'En medio del gym, suena un cumpleaños feliz.' },
  'primo-prestamo': { description: 'Cincuenta euros. Cuatro años. Cero remordimientos.' },
  'abuela-llamada-larga': { description: 'Cuarenta minutos. La misma información tres veces.' },
  'padre-llama-aplicacion-programa': { description: '"Pásame el programa ese de las fotos".' },
  'madre-diagnostico-youtube': { description: 'Era un dolor en la espalda. Para ella, cáncer.' },
  'cena-empresa-cunado': { description: 'Cinco cenas. Cinco monólogos sobre criptos.' },
  'abuelo-huerta': { description: 'Tomates como puños. Cebolla con tierra.' },
  'madre-preocupa-llamar': { description: 'Al tercer día llama a urgencias. Yo trabajo.' },
  'familiar-regalo-mal': { description: 'En 2021 le pedí un libro. Acaba de llegar.' },
  'hermano-videojuegos-toda-noche': { description: 'Cuidé de él, le saqué del lío. Solo me lo recuerda mi madre.' },
  'prima-influencer': { description: 'Tres mil seguidores. Vende tés detox.' },
  'padre-cargador': { description: 'Sin pedir. Sin devolver. Cada noche.' },
  'madre-no-tira-nada': { description: 'Bolsas dentro de bolsas dentro de bolsas.' },
  'abuela-guisa-para-ejercito': { description: 'Vamos tres. Cocina para diez. Sobra para una semana.' },
  'tia-foto-familiar-mala': { description: 'Soy el único con cámara decente. Y paciencia.' },
  'hermano-llama-solo-problemas': { description: 'Hola, ¿tienes un momento? Tengo un problema con...' },
  'padre-cine-explica-peli': { description: 'Cada gesto del actor. Cada sonido. Voz alta.' },
  'madre-compra-sin-lista': { description: 'Vuelve con tres cosas. Ninguna era la del menú.' },
  'abuela-llama-por-otro-nombre': { description: 'Cuando me regaña recuerda mi nombre real.' },
  'padre-pausa-television': { description: 'Para una llamada de dos minutos. Pausa la peli.' },
  'madre-cuenta-historia-larga': { description: 'La de cuando tenía 17. Con los mismos detalles.' },
  'tio-trae-invitado-sorpresa': { description: 'Un amigo del trabajo. Sin avisar. A la cena íntima.' },
  'abuelo-pastilla-diaria': { description: 'Catorce pastillas distintas. Ningún error.' },
  'primo-pide-favor-finde': { description: 'Viernes 21h. "Oye, una pregunta rápida..."' },
  'hermana-bano-hora': { description: 'Hora exacta. Cita importante. Cero compasión.' },
  'madre-whatsapp-voz': { description: 'Tres minutos para decir "que llames a la abuela".' },
  'padre-busca-gafas': { description: 'Las tenía puestas. Llevaba veinte minutos buscándolas.' },
  'familiar-opinion-no-pedida': { description: '"Te has engordado, ¿eh?". Postre.' },
  'abuela-llora-despedida': { description: 'Vivo a cuarenta minutos. Llora como si fuera un avión.' },
  'cunada-dieta': { description: 'Lleva tres meses con la misma dieta. La explica cada cena.' },
  'padre-no-pide-ayuda': { description: 'Cambió un grifo. Inundó el baño. Sigue diciendo que valió.' },
  'madre-regalo-de-casa': { description: 'Una camisa rosa. Talla XS. Yo soy XL.' },
  'tio-regalo-efectivo': { description: 'Veinte euros. En billete arrugado. En mano.' },
  'hermano-culpa-algo': { description: 'A los seis. A los doce. A los veinticinco.' },
  'abuelo-explica-precio': { description: 'Esto valía dos pesetas. Esto cien. Esto cuatrocientas.' },
  'madre-sabe-que-pasa': { description: 'Sin que diga nada. Solo me mira.' },
  'primo-cumpleanos-tarde': { description: 'Siempre al día siguiente. Con disculpa larga.' },
  'padre-coche-radio-maxima': { description: 'Cope a tope. Sin hablar. Conduce.' },
  'abuela-sobremesa': { description: 'Cuatro horas. Café. Galletas. Sin escapatoria.' },
  'saludo-desconocido': { description: 'Le sonreí. Me quedé saludando solo. Aceleré.' },
  'nombre-clase': { description: 'Tres veces me llamaron. Tres veces no respondí.' },
  'cague-boda': { description: 'Pasta. Whisky. Mala combinación.' },
  'nombre-limpiadora': { description: 'Tres años saludándola con un "hola" anónimo.' },
  'caca-coche': { description: 'La descubrí en el aparcamiento. Limpio nuevo.' },
  'caida-mercadona': { description: 'Las patatas rodaron tres pasillos.' },
  'aplaudi-solo-cine': { description: 'Salió bien la peli. Aplaudí. Cero apoyo.' },
  'audio-largo-texto': { description: 'Pulsé sin querer. Ocho minutos enviados.' },
  'bragueta-entrevista': { description: 'Una hora. La entrevistadora no dijo nada.' },
  'dormido-historia-pareja': { description: 'Era importante. Para él. Yo dormido.' },
  'confundi-cumpleanos': { description: 'Felicité con dos meses de retraso. O tres.' },
  'llame-profe-mama': { description: 'Voz alta. Toda la clase. Diez años de coña.' },
  'selfie-sin-querer': { description: 'Mi selfie cara de dormir. Al grupo del trabajo.' },
  'puerta-tirar-empujar': { description: 'Tres intentos. Mucha gente mirando.' },
  'responde-ok-jefe': { description: '"Tu presentación es un desastre". OK 👍.' },
  'pronuncie-mal': { description: 'En una reunión. Tres palabras. Risa contenida.' },
  'equivoque-piso': { description: 'Cinco minutos esperando. Era el 4ºB. Yo en el 5º.' },
  'cai-escalon': { description: 'No había escalón. Pero me caí.' },
  'conteste-siri-publico': { description: 'Voz alta. Vagón silencioso. Cero reacción.' },
  'risa-funeral': { description: 'No pude pararla. Mi tía me sacó del banco.' },
  'mande-audio-jefe': { description: 'Cosas privadas. Sobre el trabajo. Mi jefe.' },
  'bailando-solo-visto': { description: 'A través del portal. Sin ropa de cintura para abajo.' },
  'llore-pelicula-avion': { description: 'Animación de Pixar. El de al lado fingió no ver.' },
  'pregunta-embarazo': { description: 'Le ofrecí asiento. Era pancita de cerveza.' },
  'quede-sin-dinero-caja': { description: 'Tres tarjetas. Tres rechazos. Cinco personas detrás.' },
  'tire-copa-restaurante': { description: 'Vino tinto. Mantel blanco. Restaurante caro.' },
  'cante-cumpleanos-solo': { description: 'Empecé fuerte. Acabé susurrando.' },
  'olvide-nombre-conocido': { description: 'Llevo cinco años saludándole sin nombre.' },
  'ropa-reves-todo-el-dia': { description: 'Llegué a casa. Me lo dijo el espejo.' },
  'confundi-cara-persona': { description: 'Era moreno. Era rubia. Era mi amigo. Era una guiri.' },
  'pregunte-precio-decoracion': { description: 'Era el jarrón de la tienda. Me miraron raro.' },
  'snapchat-historia-grupo': { description: 'Mensaje íntimo subido en stories. Pánico.' },
  'pague-propina-sin-querer': { description: 'Al darle a "10%" sin querer. Cinco euros.' },
  'conteste-mal-pregunta-facil': { description: '"Capital de Francia": Madrid. Bar entero riendo.' },
  'hable-con-muro': { description: 'Hablé tres minutos. Tenía AirPods. Cero feedback.' },
  'mande-corazon-jefe': { description: 'Pulgar para arriba. Salió corazón. Adiós dignidad.' },
  'resbale-hielo': { description: 'Me caí. Me levanté. Hice como un giro de baile.' },
  'snob-restaurante': { description: 'Mispronouncié todo. La camarera era de mi pueblo.' },
  'me-baje-tren-equivocado': { description: 'Sin móvil. Sin saber dónde estaba. Esperé en silencio.' },
  'pense-era-conocido': { description: 'Saludé efusivo. Cero reconocimiento. Aceleré.' },
  'presente-mal-apellido': { description: 'Apellido de mi ex. En reunión de trabajo.' },
  'foto-fea-grupo': { description: 'Siempre con los ojos cerrados. Siempre yo.' },
  'hice-silencio-cuento-chiste': { description: 'Treinta segundos sin reacción. Cambié de tema.' },
  'pregunte-hora-tengo-movil': { description: 'Lo tenía en la mano. La señora sonrió.' },
  'me-quede-sin-papel-bano': { description: 'Tuve que pedir ayuda. Por la rendija.' },
  'sali-aseo-con-papel': { description: 'Me siguió un metro. Lo descubrí en el ascensor.' },
  'volvi-buscar-algo-olvidado': { description: 'Veinte minutos en metro. Ya no lo necesitaba.' },
  'cambie-sitio-mal': { description: 'Volvió el dueño. Tuve que levantarme con vergüenza.' },
  'no-reconoci-nuevo-corte': { description: 'Tres días después se rió. Yo aún me arrepiento.' },
  'me-mordi-lengua-comiendo': { description: 'Sangre. Servilleta. Sonrisa forzada.' },
  'dije-adios-dos-veces': { description: 'Y los dos íbamos al mismo sitio. Cinco minutos juntos.' },
  'olvide-nombre-recien-presentado': { description: 'Treinta segundos. Cero retención.' },
  'me-pillo-mirando': { description: 'Cinco minutos. Sin pestañear. Me sonrió.' },
  'aplaudi-fin-presentacion': { description: 'Era la slide de "Preguntas". Cero aplausos más.' },
  'me-cambie-pantalon-metro': { description: 'En la oficina. En el ascensor. Pánico.' },
  'olvide-apagar-micro-reunion': { description: 'Hablé conmigo mismo. Cinco minutos. Toda la sala.' },
  'cai-hamaca-playa': { description: 'Levanté arena. Vergüenza. Risas del paseo.' },
  'respone-gracias-cuando-cumpleanos': { description: 'Felicidades / Igualmente. Reflejo automático.' },
  'pregunte-cuanto-cuesta-algo-regalo': { description: 'Lo había regalado mi suegra. Estaba delante.' },
  'sone-en-clase': { description: 'Tono Pikachu. Volumen máximo. Profe me miró.' },
  'confundi-hombre-mujer': { description: 'Pelo corto. Cazadora. Mi error fue obvio.' },
  'estornude-caro': { description: 'En medio del silencio. Cinco personas saltaron.' },
  'me-gire-sin-motivo': { description: 'Convencido. Nadie. Me sentí tonto.' },
  'cai-intentar-entrar-coche': { description: 'Tropecé con el bordillo. Se rió. Se acabó la cita.' },
  'dije-te-quiero-amigo-colgar': { description: 'Reflejo. De años con mi pareja. Sin contexto.' },
  'llame-profe-nombre': { description: 'Costumbre del primer apellido. Sin "señor".' },
  'equivoque-planta-hospital': { description: 'Pedí ayuda. Me señalaron. Vergüenza pública.' },
  'no-reconoci-jefe-casual': { description: 'En chándal. Con bolsa de la compra. Saludé.' },
  'me-quede-colgado-ascensor': { description: 'Ocho minutos en silencio. Mirando el suelo.' },
  'me-sente-silla-rota': { description: 'Crujido. Inclinación. Me caí en mitad de la pregunta.' },
  'confundi-fila-supermercado': { description: 'Diez minutos esperando. Era la del jamón.' },
  'me-pillaron-foto-museo': { description: 'Vigilante serio. Borrar la foto delante de él.' },
  'pedi-la-cuenta-sin-querer': { description: 'Aún no había llegado el segundo. El camarero asumió.' },
  'conteste-correo-todos': { description: 'Reply all. Crítica al jefe. Lo leyeron 200 personas.' },
  'me-equivoque-idioma': { description: 'Le solté el "what". Era de Vallecas.' },
  'comi-comida-ajena': { description: 'Mismo táper. Distinto dueño.' },
  'me-pillo-cantando-coche': { description: 'Semáforo en rojo. Ventanilla bajada. Coche al lado.' },
  'me-salte-saludo': { description: 'Me sentí mal toda la reunión. Era el director.' },
  'presumi-de-algo-falso': { description: 'Dije que sabía conducir camión. Me mandaron a probarlo.' },
  'busque-movil-con-linterna-movil': { description: 'Tres minutos. Hasta darme cuenta.' },
  'finde-sin-dormir': { description: 'De jueves a lunes. Dormí 14h del tirón.' },
  'vomite-cabify': { description: 'En el suelo. El conductor cobró extra.' },
  'desayune-kebab': { description: '7 AM. Frío. Sin mediación.' },
  'llore-6am-amigos': { description: 'Sin razón. Solo emociones acumuladas.' },
  'llame-ex-4am': { description: 'Cogió. Hablamos diez minutos. Lo lamenté.' },
  'desperte-ciudad-ajena': { description: 'No sabía cómo había llegado. Tuve que mirar Maps.' },
  'pague-47-cabify': { description: 'A las afueras. Sin saber por qué.' },
  'llave-puerta-toda-noche': { description: 'Ocho horas con la llave en la cerradura. Por fuera.' },
  'pasta-hidratante': { description: 'A las 8 AM. Sin gafas. Sin contexto.' },
  'perdi-cartera-fiesta': { description: 'En la nevera. Con un chorizo encima.' },
  'baile-mesa-bar': { description: 'Saqué a la gente. La gente subió. Casi cae todo.' },
  'dormi-suelo': { description: 'Sin almohada. Con chaqueta de sábana.' },
  'pedi-comida-durmiendo': { description: 'Hamburguesa con piña. Lo descubrí al despertar.' },
  'perdi-zapato-fiesta': { description: 'Llegué a casa con un solo pie calzado.' },
  'llame-madre-llorando': { description: 'Tres de la mañana. Sin razón clara.' },
  'me-quede-dormido-taxi': { description: 'Tres paradas más. Pagué el doble.' },
  'me-desperte-sin-camiseta': { description: 'En mi cama. Sin recordar haberla quitado.' },
  'desayune-pizza-fria': { description: 'A las 9 AM. Margarita del día anterior.' },
  'llegue-tarde-boda-resacoso': { description: 'Llegué al postre. Con gafas de sol.' },
  'no-recorde-nada': { description: 'Última hora confirmada: 11 PM. Despertar: amanecer.' },
  'me-quede-dormido-disco': { description: 'En el sofá VIP. Reggaeton de fondo.' },
  'mande-mensaje-equivocado-borracho': { description: 'A mi jefe. Quería ser para mi pareja.' },
  'beber-agua-caldo': { description: 'A las 5 AM. Casa ajena. Cara de asco.' },
  'perdi-movil-encontre-en-nevera': { description: 'Junto a un yogur. Aún encendido.' },
  'tostada-miel-con-tomate': { description: 'Mezcla involuntaria. La comí igual.' },
  'perdi-llaves-encontre-en-bolsillo': { description: 'Veinte minutos en pánico. Estaban ahí.' },
  'foto-comprometida-historia': { description: 'Mil personas la vieron antes de borrarla.' },
  'prometi-cosas-que-no-recuerdo': { description: 'Mis amigos me lo recuerdan en cada cena.' },
  'lie-en-boda': { description: 'Con la prima del novio. Cuatro horas en el baño.' },
  'perdi-tren': { description: 'Última cerveza. Tren a las 23:14.' },
  'confundi-dia-semana': { description: 'Llegué a la oficina. Estaba cerrada.' },
  'cruce-ciudad-a-pie-resaca': { description: 'Tres horas. En zapatos de tacón. Sufriendo.' },
  'llegue-trabajo-mismo-ropa': { description: 'Mismo polo. Mismo perfume mezclado.' },
  'vomite-ascensor': { description: 'Tres pisos. Lo vio todo el vecindario.' },
  'me-gaste-todo-en-fiesta': { description: 'Cuatrocientos euros. Una noche. Sin recuerdos.' },
  'recupere-el-dia-siguiente': { description: 'Dos días en cama. Dolor de cabeza eterno.' },
  'me-perdi-en-mi-ciudad': { description: 'Llevaba veinte años viviendo allí.' },
  'prometi-no-beber-mas': { description: 'En el baño. Vomitando. Lo prometí en serio.' },
  'me-bebi-el-agua-de-los-hielos': { description: 'Sed extrema. Cero juicios morales.' },
  'baile-sin-musica': { description: 'La música se cortó. Yo seguí bailando.' },
  'me-fui-sin-despedirme': { description: 'A las 4 AM. Sin avisar. Sin culpa.' },
  'pague-ronda-sin-querer': { description: 'Diez personas. Cuarenta euros. Adiós.' },
  'llegue-sol-a-casa': { description: 'Pájaros cantando. Yo arrastrándome.' },
  'me-acoste-con-abrigo': { description: 'Y zapatos. Y bolso. Y todo.' },
  'dormi-con-lentillas': { description: 'Una semana sin poder abrir bien los ojos.' },
  'me-cai-portal': { description: 'Resbalé en el felpudo. Vecino me ayudó.' },
  'me-sente-bordillo': { description: 'Bocadillo de jamón. Cinco AM. Plaza vacía.' },
  'confundi-habitaciones-hotel': { description: 'Toqué tres puertas. La cuarta era la mía.' },
  'perdi-auriculares': { description: 'Eran nuevos. Cien euros. Adiós.' },
  'me-pase-de-parada': { description: 'Final de línea. Tres estaciones más allá.' },
  'fotos-vergonzosas-stories': { description: 'Tres bochornos. Cinco minutos para borrarlas.' },
  'dicho-cosas-que-no-recorde': { description: 'Mis amigos las recuerdan. Yo no.' },
  'compre-algo-online-dormido': { description: 'Llegó un libro de matemáticas. Cero idea.' },
  'me-comi-lo-del-frigorifico': { description: 'Yogur. Queso. Pavo. Pepinillos. Sin orden.' },
  'me-dormi-parada-bus': { description: 'Tres autobuses pasaron. Yo dormido.' },
  'vomite-fuente': { description: 'En la fuente del Cibeles. A las 4 AM.' },
  'descubri-nuevo-amigo': { description: 'Le di mi número. Nunca le respondí.' },
  'me-puse-mal-antes-de-empezar': { description: 'Botellón antes. Llegué incapacitado.' },
  'fui-a-trabajar-sin-dormir': { description: 'Mi jefe me preguntó si estaba bien. Mentí.' },
  'me-desperte-en-el-suelo': { description: 'Puerta del salón abierta. Vecinos me vieron.' },
  'pedi-pizza-sin-acordarme': { description: 'A las 4 AM. Llegó a las 10. Sigo sin saber por qué.' },
  'empece-fiesta-antes-de-cenar': { description: 'A las 7 PM. La cena nunca llegó.' },
  'perdi-a-mis-amigos': { description: 'Sin móvil. Sin saber dónde estaba.' },
  'fui-avion-resacoso': { description: 'Treinta y cinco grados. Vómito en el avión.' },
  'cuernos-dos-veces': { description: 'No es mala suerte. Eres tú.' },
  'ex-stories-sin-like': { description: 'Sin un solo emoji. Solo presencia silenciosa.' },
  'declaracion-visto': { description: 'Ticks azules. Cero respuesta. Adiós.' },
  'sabanas-ruptura': { description: 'Olían a él. Tres días sin querer cambiar.' },
  'llore-ikea': { description: 'En el sofá de exposición. La gente miraba.' },
  'volvi-ex': { description: 'Sabía que era mala idea. Lo hice tres veces.' },
  'stalk-novia-nueva': { description: 'Llegué a sus fotos de 2014. La encontré.' },
  'mensaje-borracho-no-debi': { description: 'Tres páginas. Dos horas escribiéndolas.' },
  'dejaron-ok': { description: 'Mensaje de tres líneas. Yo "OK". Cero más.' },
  'enamorado-sin-saber': { description: 'Le observaba en la cafetería de la uni. Cinco años.' },
  'ghosting-despues-primera-cita': { description: 'Pensé que iba bien. Cero respuesta dos semanas.' },
  'escribi-borre-mensaje': { description: 'Cada noche. Dos meses. Sin enviar.' },
  'match-tinder-sin-hablar': { description: 'Está ahí. Sin hablarle. Caduca solo.' },
  'vi-ex-en-mercadona': { description: 'Detrás de los cereales. Siete minutos sin moverme.' },
  'deje-por-texto': { description: 'Dos años de relación. Mensaje de cuatro líneas.' },
  'me-dejaron-cumpleanos': { description: 'Antes del pastel. En el bar.' },
  'mande-foto-equivocada': { description: 'Pánico. Borré rápido. Ya estaba leído.' },
  'busque-senales': { description: 'Estado online. Foto de perfil. Hora de conexión.' },
  'hice-like-foto-antigua': { description: 'Sin querer. Lo retiré. Demasiado tarde.' },
  'ex-nueva-pareja-instagram': { description: 'Lo vi una mañana. Lloré antes del café.' },
  'cita-hinge-horrorosa': { description: 'Dos horas. Cero conexión. Pagamos a medias.' },
  'me-enamore-de-un-amigo': { description: 'Lo dije. Se acabó la amistad.' },
  'plante-primera-cita': { description: 'Inventé una emergencia. Cancelé desde casa.' },
  'me-plantaron': { description: 'Esperé cuarenta minutos. Solo en la mesa.' },
  'llore-cancion-que-era-nuestra': { description: 'En el coche. En atasco. Solo.' },
  'texte-yo-siempre': { description: 'Cada conversación empezada por mí.' },
  'me-rechazaron-en-persona': { description: 'En la cafetería. Mis amigos lo escucharon todo.' },
  'guarde-conversaciones': { description: 'Capturas de cada mensaje. En carpeta oculta.' },
  'abri-cuaderno-de-penas': { description: 'Treinta páginas. Sin compartir. Sin guardar.' },
  'vi-perfil-tinder-ex': { description: 'Mientras seguíamos juntos. Confirmación de mis sospechas.' },
  'enamore-sin-posibilidad': { description: 'Vivía en otra ciudad. Sabía que era imposible.' },
  'estuve-en-zona-amiga': { description: 'Dos años aguantando. Hasta que dijo "es como mi hermano".' },
  'compre-regalos-para-nada': { description: 'Cumpleaños. Navidad. San Valentín. Sin destinatario.' },
  'cambie-planes-por-alguien': { description: 'El mensaje no llegó. Yo solo en casa esperando.' },
  'vi-pelicula-triste-sola': { description: 'Bridget Jones. Helado de Häagen-Dazs. Lágrimas.' },
  'me-pusieron-cuernos-en-navidad': { description: 'En la cena familiar. Detrás del árbol.' },
  'quede-con-alguien-del-trabajo': { description: 'Nos lieamos. El lunes nos hicimos los locos.' },

  // ===== v2-part-2 (243) ===============================================
  'estuve-sola-san-valentin': { description: 'Pedí cena para uno. Lloré con la peli.' },
  'bloquee-desbloquee-ex': { description: 'Tres veces. Sin lógica. Sin consistencia.' },
  'me-enamore-de-alguien-que-no-me-queria': { description: 'Un año entero negándomelo. Otro asumiéndolo.' },
  'escribi-carta-nunca-mande': { description: 'Sigue en el cajón. La leo cada mudanza.' },
  'primera-vez-incomoda': { description: 'Reí más que disfruté. Recuerdo el techo.' },
  'primera-ruptura-apocalipsis': { description: 'Lloré tres semanas. Pensé que nunca pasaría.' },
  'me-siguen-en-instagram-exes': { description: 'Cero stories vistas. Cero conversaciones. Solo presencia.' },
  'compre-anticonceptivos-nervioso': { description: 'Cara de poker. Voz baja. Pago rápido.' },
  'me-gusto-alguien-que-tenia-pareja': { description: 'Aguanté seis meses. Sin decírselo a nadie.' },
  'ex-del-mismo-circulo': { description: 'Cenas incómodas. Bodas incómodas. Vida incómoda.' },
  'tarde-en-superar-ruptura': { description: 'Salimos seis meses. Tardé un año en olvidar.' },
  'fui-boda-soltero': { description: 'Mesa de los singles. Cero conexiones.' },
  'menti-sobre-ex': { description: 'Dije tres. Eran ocho. Lo conté como tres.' },
  'me-compararon-con-ex': { description: '"Mi ex hacía esto mejor". En la cama.' },
  'chat-copiado-equivocada': { description: 'Mensaje sobre ella. A ella. Adiós.' },
  'primer-te-quiero-no-devuelto': { description: '"Gracias". Y un silencio largo.' },
  'me-ilusione-de-mas': { description: 'Una cita y ya estaba escogiendo nombre de hijo.' },
  'vi-ex-en-san-valentin': { description: 'Con alguien nuevo. Sonriendo. Yo en el bar solo.' },
  'me-escribio-despues-de-meses': { description: '"Hola". Sin más. Sin contexto.' },
  'primera-cita-tinder': { description: 'Llegó borracho. Pidió bizum. Adiós.' },
  'me-dejaron-sin-explicacion': { description: 'Mensaje de cuatro líneas. Bloqueo.' },
  'ex-con-amigo-mio': { description: 'Lo descubrí en una boda. Dos pérdidas en un día.' },
  'enamore-personaje-serie': { description: 'Bingewatch en una semana. Lloré en el final.' },
  'vi-exes-de-ex': { description: 'Stalk doble. Hasta el 2014. Sin remordimientos.' },
  'me-dejaron-por-alguien-mejor': { description: '"Mereces algo mejor". Lo decía con su nuevo al lado.' },
  'declare-con-testigos': { description: 'En la cafetería. Diez personas mirando. Cero respuesta.' },
  'relacion-larga-distancia': { description: 'Dos años. Cuatro vuelos. Cero futuro.' },
  'dependi-del-movil': { description: 'Siete horas mirando la pantalla. Cero notificaciones.' },
  'vi-ex-en-festival': { description: 'En la primera fila. Con su nueva. Yo me fui temprano.' },
  'llore-en-aeropuerto': { description: 'Despedida real. Sin saber cuándo lo vería otra vez.' },
  'me-gusto-persona-imposible': { description: 'Mi profe. Cinco años intentando olvidarlo.' },
  'termine-algo-que-no-empezo': { description: 'Tres meses sin label. Acabé sola igualmente.' },
  'guarde-objeto-ex': { description: 'Su sudadera. Tres años después la quemé.' },
  'me-acoste-llorando': { description: 'No diré cuántas veces. Demasiadas.' },
  'le-di-segunda-oportunidad': { description: 'Sabía que era mala idea. La di igual.' },
  'me-enamore-en-vacaciones': { description: 'Tres días intensos. Cero contacto después.' },
  'me-entere-de-infidelidad-en-instagram': { description: 'Lo etiquetaron en una foto. Conmigo en otra.' },
  'escribi-su-nombre-sin-querer': { description: 'En un correo del trabajo. Lo borré tres veces.' },
  'llame-mama-jefe': { description: 'En reunión. Voz alta. Diez personas. Risa contenida.' },
  'vomite-cena-empresa': { description: 'En el baño. Antes del postre. Lo recordaron.' },
  'llore-bano-oficina': { description: 'Cinco minutos. Volví como si nada.' },
  'dormi-reunion-teams': { description: 'Cámara puesta. Roncaba. Lo grabaron.' },
  'busque-curro-en-curro': { description: 'InfoJobs en pestaña secreta. Excel en la principal.' },
  'correo-no-llego': { description: 'Lo había leído. Tres veces. Mentí.' },
  'semana-cama-teletrabajo': { description: 'Sin levantarme. Comiendo en la mesilla.' },
  'jefe-no-sabe-mi-nombre': { description: 'Un año entero. "Tú, el del fondo".' },
  'trabaje-domingo-nada': { description: 'Cinco horas. Nadie miró el deliverable.' },
  'culpa-al-outlook': { description: '"No me llegó". Llegó. Lo borré sin querer.' },
  'camara-apagada-todo-el-dia': { description: 'Cero presencia. Cero sospechas. Cero curro.' },
  'primer-sueldo-desaparecio': { description: 'Mil euros. Tres días. Cero idea de dónde.' },
  'comi-triste-mio-de-pie': { description: 'En mi mesa. Sin mirar. Migas en el teclado.' },
  'mande-cv-empresa-en-la-que-trabajo': { description: 'Para una vacante interna. Lo descubrieron.' },
  'me-quede-dormido-presentacion': { description: 'En mi propia presentación. Cinco segundos.' },
  'hice-horas-extra-sin-paga': { description: 'Tres meses currando los sábados. Cero compensación.' },
  'menti-entrevista': { description: 'Dije que sabía Excel avanzado. No sabía sumar.' },
  'me-confundi-de-sala-reunion': { description: 'Me senté. Saludé. Eran de otra empresa.' },
  'companero-come-olor-fuerte': { description: 'Cada lunes. Pescado al microondas. Tres años así.' },
  'primer-dia-no-encontre-bano': { description: 'Aguanté hasta llegar a casa.' },
  'firme-sin-leer': { description: 'Veinte páginas. Le di scroll rápido. Acepté.' },
  'dimiti-sin-otro-trabajo': { description: 'Tres meses sin nada. Dormí mejor.' },
  'tuve-jefe-peor': { description: 'Dos años. Lo callé todo. Lo dije al irme.' },
  'me-olvide-reunion-importante': { description: 'Avisaron por Slack. Yo en otra reunión.' },
  'me-dormi-con-emails-abiertos': { description: 'Con la cabeza en el teclado. Mensaje incoherente enviado.' },
  'trabaje-con-fiebre': { description: 'Tres días con 38º. Por miedo a perder días.' },
  'me-pillaron-en-redes-en-hora-trabajo': { description: 'Mi jefe pasó por detrás. Twitter abierto.' },
  'me-echaron-primer-curro': { description: 'A los dos meses. "No encajas con la cultura".' },
  'practique-firma-nuevo-nombre': { description: 'Tres semanas haciendo garabatos. Sigo sin gustarla.' },
  'llegue-tarde-el-primer-dia': { description: 'Veinte minutos. Excusé el metro.' },
  'me-equivoque-de-destinatario-email': { description: 'A toda la empresa. Sobre toda la empresa.' },
  'cobre-menos-que-esperaba': { description: 'Mil quinientos brutos. Mil cien netos. Llegué a llorar.' },
  'companero-habla-mucho': { description: 'Auriculares puestos. Le da igual. Sigue hablando.' },
  'me-arrepenti-de-dimision': { description: 'A las 48 horas. Pedí volver. Me dijeron que sí.' },
  'copie-a-companero': { description: 'Su Excel. Mi nombre. Mi gloria.' },
  'reunion-que-era-email': { description: 'Una hora. Tres slides. Una conclusión que cabía en un párrafo.' },
  'llegue-tarde-excusa-metro': { description: 'No había metro. Yo dormido. Cero remordimientos.' },
  'puse-fondo-falso-teletrabajo': { description: 'Una librería. Mi cuarto era un caos.' },
  'hice-la-lista-de-curros-futuros': { description: 'Mientras escuchaba a mi jefe. Sin disimular.' },
  'no-encontre-aparcamiento-llegue-tarde': { description: 'Excusa de oro. Universal. Sin verificación.' },
  'perdi-hilo-reunion-larga': { description: 'A los veinte minutos. Asentí a todo.' },
  'comi-con-jefe-incomodo': { description: 'Hora y media. Cero temas en común.' },
  'guarde-cosas-en-el-cajon-varios-meses': { description: 'Llegó un punto que ya no las recordaba.' },
  'me-dormi-en-el-tren-de-vuelta': { description: 'Final de línea. Tres estaciones más allá.' },
  'trabaje-en-algo-inutil': { description: 'Tres semanas de curro. Cancelado sin aviso.' },
  'me-olvide-el-portatil': { description: 'En casa. Día de la presentación. Pánico.' },
  'me-ascendieron-sin-sueldo': { description: 'Más responsabilidad. Mismo dinero.' },
  'pregunte-algo-ya-explicado': { description: 'En la slide anterior. Con énfasis.' },
  'llegue-mucho-antes-por-nervios': { description: 'Cuarenta y cinco minutos. Me senté en la calle.' },
  'me-dormi-en-formacion': { description: 'Dos horas de PowerPoint. Cabeza en la mesa.' },
  'tuve-que-saludar-sin-recordar-nombre': { description: 'Improvisé. "Hola tú". Sigue funcionando.' },
  'trabaje-navidad': { description: 'El 25. En remoto. Sin cobrar extra.' },
  'cometi-error-grande-calle': { description: 'Una semana sin decírselo. Lo arreglé en silencio.' },
  'me-cambiaron-de-proyecto-sin-avisar': { description: 'Lunes. Nueva carpeta. Sin contexto.' },
  'copie-plantilla-correo': { description: '"Estimado Sr. García". El cliente era Pedro Martínez.' },
  'me-bloquearon-reunion-a-la-hora-de-comer': { description: 'Cada miércoles. Recurrente. Sin negociación.' },
  'fui-despedida-empresa-de-alguien': { description: 'Aguanté tres horas fingiendo cariño.' },
  'tuve-jefe-que-se-atribuyo-mi-trabajo': { description: 'Yo en la sala. Le aplaudieron a él.' },
  'hice-el-trabajo-de-otro': { description: 'Dos semanas. Cero crédito. Cero gracias.' },
  'use-la-impresora-en-mal-momento': { description: 'Atascada. Tres veces. Antes de la reunión.' },
  'me-equivoque-de-sala-el-primer-dia': { description: 'Saludé efusivo. Eran de otro equipo.' },
  'acepte-trabajo-con-sueldo-bajo': { description: 'Por miedo. Llevo dos años arrepintiéndome.' },
  'cai-rompi-cabeza': { description: 'Literalmente. Cuatro puntos.' },
  'lumbalgia-cordones': { description: 'Los 30 llegan sin avisar.' },
  'hueso-aceituna': { description: 'Lo tragué en la cena. Sin decir nada.' },
  'escayola-despacito': { description: 'Wedding party. Dos meses con muletas.' },
  'urgencias-lentilla': { description: 'Detrás del ojo. Tres horas sacándola.' },
  'queme-lengua-cafe': { description: 'Sin esperar. Cada mañana.' },
  'piojos-adulto': { description: 'En la cabeza. A los 28. Vergüenza pública.' },
  'patatus-factura': { description: 'Mil ochocientos euros. Casi me caigo en la mesa.' },
  'lego-nocturno': { description: 'A las 3 AM. Grité. Toda la casa despertó.' },
  'palillo-encia': { description: 'Sangré. Disimulé. Seguí celebrando.' },
  'me-torci-tobillo-plano': { description: 'En el supermercado. Sin obstáculos.' },
  'queme-con-planchado': { description: 'En el pecho. Marca de plancha en negativo.' },
  'corte-con-tijeras-de-ensalada': { description: 'Tres puntos en el pulgar.' },
  'me-desmaye-analisis': { description: 'Tres tubos. Caí. La enfermera me cogió.' },
  'alergia-sin-saber': { description: 'A los gambas. En la cena de la suegra.' },
  'me-golpee-dedo-puerta': { description: 'Negro durante tres meses. Se cayó la uña.' },
  'me-cai-bicicleta-adulto': { description: 'Frente a un grupo de adolescentes. Risas eternas.' },
  'me-clave-esquirla': { description: 'Tres días intentando sacarla. Acabé en urgencias.' },
  'gastroenteritis-viaje': { description: 'En el primer día. Tres días en el baño.' },
  'dormi-mal-semana': { description: 'Sin razón. Sin café. Sin solución.' },
  'me-golpee-con-armario': { description: 'Sin gafas. Sin luz. Cabeza directa.' },
  'queme-con-sarten': { description: 'Cero técnica. Cero precaución. Cicatriz visible.' },
  'me-cai-cama': { description: 'Durmiendo. Sin colchón cerca.' },
  'me-indigeste-sin-exceso': { description: 'Tortilla. Como cada miércoles. Tres días en cama.' },
  'me-pille-el-pelo-secador': { description: 'Tres minutos enredada. Tijeras al rescate.' },
  'me-golpee-la-cabeza-maletero': { description: 'Levantándome. Cero conciencia espacial.' },
  'resfrio-verano': { description: 'En agosto. Con bufanda. Sufrimiento puro.' },
  'me-pele-nariz-sol': { description: 'Crema factor 50. Ineficaz. Tres días pelada.' },
  'dolor-espalda-sofa': { description: 'Cinco horas viendo Netflix. Tres días sufriendo.' },
  'calambre-piscina': { description: 'A 50 metros de la orilla. Casi me ahogo.' },
  'me-golpee-en-el-ojo': { description: 'Sin recuerdo. Moratón visible. Inventé excusa.' },
  'reaccion-alergia-maquillaje': { description: 'Cara hinchada. El día de mi boda.' },
  'calambres-por-frio': { description: 'A las 4 AM. Grité. Mi pareja saltó de la cama.' },
  'me-clave-aguja-cosiendo': { description: 'Cosiendo un botón. Sangré en el polo.' },
  'me-arranque-piel-en-invierno': { description: 'Labios de papel. Sangré en una reunión.' },
  'me-golpee-arco-pie': { description: 'Tres meses cojeando. Uña perdida.' },
  'me-bebi-agua-tragante': { description: 'Tos brutal. La gente del bar me miraba.' },
  'me-queme-pelo': { description: 'Una vela. Tres mechones. Olor que no se quita.' },
  'lumbago-estornudo': { description: 'Tres días sin poder moverme.' },
  'no-dormi-por-cafeina': { description: 'A las 6 PM. Sin culpa. Mucha responsabilidad.' },
  'alergia-sol': { description: 'Manchas rojas. Picor. Cero baño este verano.' },
  'me-di-con-cristal': { description: 'Nariz primero. Frente. Cero gracia.' },
  'cai-escalera-casa': { description: 'Sin pasamanos. Sin culpa.' },
  'me-corte-afeitando-cara': { description: 'El día de la entrevista. Trozo de papel pegado.' },
  'queme-lengua-pizza': { description: 'Quesos en suspensión. Lengua quemada por días.' },
  'me-intoxique-con-mejillones': { description: 'En el bar de toda la vida. Tres días en cama.' },
  'dolor-cuello-dormir-mal': { description: 'Sin razón. Tortícolis durante una semana.' },
  'me-disloque-una-articulacion': { description: 'Atándome los cordones. Increíble pero cierto.' },
  'me-pico-avispa': { description: 'En la primera cita. En el cuello. Hinchazón visible.' },
  'me-meti-agua-en-nariz': { description: 'Saltando de cabeza. Cero técnica.' },
  'me-raspe-las-rodillas': { description: 'A los 30. Como un crío.' },
  'me-corto-el-papel': { description: 'En medio de una reunión. Saqué tirita del bolsillo.' },
  'me-entraron-ganas-urgentes': { description: 'En una ciudad sin baños públicos. Pánico.' },
  'me-maree-barco': { description: 'Sin viento. Sin olas. Mi cuerpo decidió.' },
  'me-di-en-la-frente': { description: 'Armario abierto. Sin luz. Vi estrellas.' },
  'olvide-pastillas': { description: 'Una semana. Lo descubrí cuando empezaron los síntomas.' },
  'me-cai-escalon-entrada': { description: 'En el bar de mi pueblo. Risas a mi costa.' },
  'me-lastime-ducha': { description: 'Resbalé. Con jabón. Sin trauma mayor. Sí pequeño.' },
  'me-golpee-con-mueble-oscuridad': { description: 'Cuatro muebles. Una sola noche. Cero gracia.' },
  'me-atragante-sin-motivo': { description: 'Comiendo solo. Pensando en el trabajo.' },
  'me-clave-agujas-manualidades': { description: 'En el dedo gordo. El proyecto sigue sin terminar.' },
  'vi-ballena': { description: 'En vivo y en directo.' },
  'deportado-sello': { description: 'Al aterrizar. Vuelta el mismo día. Vergüenza.' },
  'malaria-tailandia': { description: 'Tres semanas en cama. Pastillas para tres meses.' },
  'perdi-maleta': { description: 'Y nunca apareció. Con todo lo necesario para tres días.' },
  'dormi-barajas': { description: 'Con la maleta de almohada. Sin manta.' },
  '200-euros-bus': { description: 'Por ir mal sentada. Por sentarse en clase business.' },
  'regatear-bazar': { description: 'Empecé en 50. Pagué 80. Acepté con sonrisa.' },
  'diarrea-erasmus': { description: 'En el primer día. En la primera fiesta. Pánico universal.' },
  'llore-ver-mar': { description: 'Dos años sin verlo. Caí de rodillas en la arena.' },
  'mal-pulpo-galicia': { description: 'En la mejor pulpería. Tres días en el baño.' },
  'perdi-avion': { description: 'Por dormirme en la sala de espera.' },
  'pasaporte-caducado': { description: 'Dos meses. Tuve que volver del aeropuerto a casa.' },
  'vuelo-cancelado-sin-aviso': { description: 'Me enteré en el mostrador. Cuatro horas de cola.' },
  'hostal-6-camas': { description: 'Dos roncadores. Cero descanso. Tres noches.' },
  'turista-mi-ciudad': { description: 'Llevaba veinte años. No había visto nada.' },
  'error-airbnb': { description: 'Las fotos eran de hace diez años. La realidad apestaba.' },
  'blablacar-raro': { description: 'Tres horas hablándome de bitcoin. Sin parar.' },
  'olvide-cargador-hotel': { description: 'En la cómoda. Lo descubrí en la puerta de embarque.' },
  'me-queme-primer-dia': { description: 'Crema sin aplicar. Hombros ardientes. Tres días sin poder dormir boca arriba.' },
  'no-hable-el-idioma': { description: 'Solo gestos. Acabé hablando inglés con todos.' },
  'perdi-excursion-grupo': { description: 'Me distraí. Volví caminando solo. Tres horas.' },
  'me-estafaron-taxi': { description: 'Sesenta euros en moneda local. Diez en realidad.' },
  'comi-algo-raro': { description: 'No supe qué era. Lo comí. Lo lamenté.' },
  'me-perdi-sin-datos': { description: 'Tres horas dando vueltas. Pregunté por gestos.' },
  'me-multaron-metro-extranjero': { description: 'En Berlín. Sin billete válido. Cien euros en cash.' },
  'llegue-hotel-a-las-4am': { description: 'Mi habitación dada a otro. Sofá del recibidor.' },
  'reserve-vuelta-mal': { description: 'Un día antes. Pagué nuevo vuelo. Cero apoyo.' },
  'subi-montana-zapatillas': { description: 'Sin suela. Resbalé. Acabé descalzo.' },
  'hice-turismo-solo': { description: 'Por primera vez. Mejor viaje de mi vida.' },
  'me-perdi-el-vuelo-conexion': { description: 'Treinta segundos tarde. Esperé seis horas el siguiente.' },
  'me-queje-del-hotel-en-redes': { description: 'En el momento de enfado. Lo borré al día siguiente.' },
  'blablacar-conductor-puso-su-musica': { description: 'Reggaeton ininterrumpido. Tres horas.' },
  'llegue-cierre': { description: 'Quince minutos tarde. La puerta cerrada en mi cara.' },
  'perdi-monedero-ciudad-ajena': { description: 'Sin tarjetas. Sin DNI. Sin español.' },
  'borracho-en-barco': { description: 'Sin moverme del bar. Aguanté con limones.' },
  'mezcle-idiomas': { description: 'Italiano + inglés + español. La gente entendía a la mitad.' },
  'me-queme-haciendo-cola': { description: 'Tres horas en la cola. Cero sombra. Cero crema.' },
  'viaje-sin-ropa-interior': { description: 'Cinco días. Tres pares. Las lavé en el lavabo.' },
  'compre-souvenirs-horribles': { description: 'Doce imanes. Sin destinatario claro.' },
  'llegue-distinto-aeropuerto': { description: 'Cien kilómetros del que esperaba. Pagué taxi.' },
  'despertador-hotel-no-sono': { description: 'Perdí el tren. Excusa para alargar el viaje.' },
  'comi-lo-mismo-toda-una-semana': { description: 'Pasta carbonara. Cada noche. El único sitio fiable.' },
  'me-ataque-foto-turista': { description: 'Doscientas. Cero decentes. Cero subidas.' },
  'me-quede-sin-bateria-en-viaje': { description: 'Sin GPS. Sin Maps. Sin esperanza.' },
  'primer-viaje-solo-al-extranjero': { description: 'Diecinueve años. Aprendí más en una semana que en cinco años.' },
  'me-robaron-cartera-metro': { description: 'En París. Sin DNI. Tres días para reponerlo.' },
  'perdi-ropa-lavanderia-hostal': { description: 'Mi camiseta favorita. Sin recuperar.' },
  'hice-el-camino-de-santiago': { description: 'Treinta días. Veinte kilos perdidos. Una vida cambiada.' },
  'dormi-avion-boca-abierta': { description: 'Roncaba. Babas. Foto en redes sin saberlo.' },
  'me-perdi-vuelta-hotel': { description: 'A doscientos metros del restaurante. Una hora dando vueltas.' },
  'fui-con-amigos-llegue-solo': { description: 'Perdimos el grupo en el aeropuerto. Llegué solo.' },
  'me-quede-dormido-tren-internacional': { description: 'Dos países más adelante. Volví al día siguiente.' },
  'comi-sin-saber-precio': { description: 'Cien euros la cena. Sonreí. Pagué.' },
  'no-encontre-alojamiento': { description: 'Tres horas dando vueltas. Acabé en un hostel ruinoso.' },
  'me-equivoque-de-autobus': { description: 'Quince minutos hasta darme cuenta. Bajé a pie.' },
  'llegue-sin-efectivo-extranjero': { description: 'Cero cajeros. Cero tarjeta aceptada. Pasé hambre.' },
  'primer-viaje-erasmus': { description: 'Una mochila. Veinte kilos. Cero idea de qué hacía.' },
  'vi-amanecer-en-un-sitio-especial': { description: 'En el desierto. Sin nadie. Cero móvil. Lo guardé.' },
  'dormi-aeropuerto-segunda-vez': { description: 'Por elección. Por economía. Por aventura.' },
  'me-confundi-de-tren': { description: 'Dirección contraria. Bajé y volví.' },
  'fui-destino-que-odiaba': { description: 'Ibiza con mis padres. Acabó siendo el mejor.' },
  'cura-tabaco-7am': { description: 'Marca blanca. Sin mirarme a los ojos.' },
  'escarabajo-crudo': { description: 'Y no estabas en la jungla.' },
  'aprendi-punto': { description: 'No lo he vuelto a hacer. Pero sé.' },
  'hable-solo-vecino': { description: 'Lo descubrí cuando se rió desde el balcón.' },
  'ticket-mercadona-6meses': { description: 'Sin razón aparente. Lo conservo.' },
  'karaoke-sin-sabersela': { description: 'Inventé letra. La gente cantó conmigo.' },
  'gane-bingo-verguenza': { description: 'Susurré "bingo". Me hicieron repetir.' },
  'follando-parque': { description: 'Detrás de los arbustos. Pasé sin mirar.' },
  'bateria-consola-bolsillo': { description: 'La encontré dos semanas después.' },
  'compre-en-wallapop': { description: 'Una raqueta de tenis. Llevo cinco años sin tocarla.' },
  'vendi-en-wallapop': { description: 'Por la mitad. Sin remordimientos.' },
  'me-quede-en-casa-mirar-pared': { description: 'Diez minutos. Sin pensar. Sin móvil. Cero culpa.' },
  'perdi-apuesta-estupida': { description: 'Tuve que comer un limón entero. Foto incluida.' },
  'cante-en-ducha-sin-saber': { description: 'Mi pareja lo grabó. Llevo tres años justificándolo.' },
  'compre-libro-no-lei': { description: 'En la mesilla. Página 1 desde 2022.' },
  'deje-planta-morir': { description: 'Tres semanas sin agua. Lo asumí.' },
  'gaste-en-app': { description: 'Diez euros en gemas. Cinco minutos. Pure shame.' },
  'me-apunte-gym-no-fui': { description: 'Tres veces en seis meses. Cuarenta euros al mes.' },
  'me-apunte-curso-no-termine': { description: 'Quince módulos. Vi el primero. Tres veces.' },
  'vi-serie-24h': { description: 'Diez capítulos. Cero descanso. Cero arrepentimientos.' },
  'pedi-extra-no-cobre': { description: 'Galletas. Tres veces. Sin cobrar. Cero culpa.' },

  // ===== v2-part-3 (243) ===============================================
  'festivo-trabaje': { description: 'Día 1 de mayo. Mandé tres correos. Me lo confirmó un colega.' },
  'fui-supermercado-hambre': { description: 'Volví con cien euros. Y tres tabletas de chocolate.' },
  'me-perdi-en-ikea': { description: 'Cuarenta minutos en bodegones. Salí por las velas.' },
  'ensamble-ikea-mal': { description: 'La estantería tiene los cajones al revés. La uso así.' },
  'me-quede-dormido-concierto': { description: 'En primera fila. La gente saltaba. Yo dormía.' },
  'espere-mesa-restaurante-famoso': { description: 'Dos horas. La comida normal. Lo agradecí en redes.' },
  'perdi-contrasena': { description: 'La de la cuenta del banco. Tres días sin acceder.' },
  'olvide-cumpleanos-amigo': { description: 'Lo vi en stories. Felicité tarde. Inventé excusa.' },
  'tuve-vecino-ruidoso': { description: 'Discutía a las 2 AM. Cada día. Tres años.' },
  'me-equivoque-de-chat': { description: 'Mensaje sobre mi jefe. Al chat con mi jefe.' },
  'hice-foto-perfecta-por-accidente': { description: 'Sin filtros. Sin pose. La conservo en favoritos.' },
  'encontre-dinero-bolsillo': { description: 'Veinte euros. En la chaqueta de invierno.' },
  'guarde-ropa-por-si-acaso': { description: 'Vaqueros de hace cinco años. Sigue sin caberme.' },
  'me-conecte-wifi-nombre-gracioso': { description: '"FBI Surveillance Van". Sin contraseña.' },
  'me-calle-opinion-importante': { description: 'En la reunión. La dije después en privado. Tarde.' },
  'ordene-cuarto-y-lo-destroce-al-dia': { description: 'Veinticuatro horas duró la limpieza.' },
  'me-di-cuenta-de-algo-anos-despues': { description: 'Una conversación de 2018. La entendí en 2024.' },
  'me-regale-a-mi-mismo': { description: 'Un libro. Un café. Una flor. Cero remordimientos.' },
  'vi-algo-en-la-calle-no-conte': { description: 'Ni a mi pareja. Ni a mi terapeuta. Solo yo y eso.' },
  'meti-ropa-lavadora-sin-separar': { description: 'Camisa nueva. Calcetín rojo. Adiós blanco.' },
  'me-apunte-newsletter': { description: 'Tres meses sin desinscribirme. Llenan la bandeja.' },
  'llegue-a-tiempo-al-sitio-equivocado': { description: 'A la dirección anterior del bar. Cerrado hace dos años.' },
  'comi-caducado': { description: 'Yogur. Tres días pasados. Lo descubrí al limpiar.' },
  'me-quede-sin-bateria-en-momento-crucial': { description: 'En medio de un trayecto desconocido. Sin maps.' },
  'llegue-a-un-sitio-cerrado': { description: 'Festivo local. Cero sitios abiertos. Bocadillo en banco.' },
  'me-sente-chicle': { description: 'Vaquero blanco. Dos horas. Cero remedio.' },
  'gaste-en-algo-inutil': { description: 'Una freidora de aire. Un uso. Polvo desde entonces.' },
  'me-olvide-de-decir-algo-importante': { description: 'En la reunión. Me acordé en el ascensor.' },
  'abri-paraguas-adentro': { description: 'Tres ojos me miraron. Mala suerte garantizada.' },
  'fui-evento-no-era': { description: 'Boda. Era de otra Marta. Bebí champán y me fui.' },
  'me-quede-mirando-pantalla': { description: 'Tres minutos. Cero idea de qué buscaba.' },
  'imprimi-mal': { description: 'Treinta páginas al revés. La impresora del trabajo me odia.' },
  'gaste-en-moda-rapida': { description: 'Tres camisetas en Shein. Sin ponerme ninguna.' },
  'me-falle-a-mi-mismo': { description: 'Aprenderé inglés en 2024. Sigo en presente continuo.' },
  'me-olvide-descongelar': { description: 'A las 9 PM. Pizza congelada al rescate.' },
  'me-dormi-plan': { description: 'Veinte minutos antes de salir. Cancelé desde la cama.' },
  'camine-al-reves': { description: 'Cinco minutos seguros. Mismo cartel. Cero idea.' },
  'compre-regalo-tarde': { description: 'Una semana después. Sin envoltorio. Disculpas incluidas.' },
  'respondi-no-se-a-pregunta-de-mi-trabajo': { description: 'Mi propio puesto. Cero respuesta. Vergüenza.' },
  'me-pille-dedos-cajon': { description: 'Tres veces seguidas. Mismo dedo. Cero aprendizaje.' },
  'hice-screenshot-de-un-screenshot': { description: 'No reconozco la imagen original. Solo el zoom.' },
  'me-equivoque-de-piso-ascensor': { description: 'Subí al cuarto. Vivo en el tercero. Bajé.' },
  'guarde-por-si-acaso-borre': { description: 'Tres meses guardado. Borré el día que lo iba a usar.' },
  'conteste-mi-propio-mail': { description: 'En el hilo. Sin darme cuenta. Cero contexto.' },
  'puse-despertador-tarde-por-error': { description: 'PM en lugar de AM. Llegué a las 7 PM al trabajo.' },
  'acumule-basura-sin-bajar': { description: 'Tres semanas. El olor llegó al pasillo.' },
  'hable-con-el-espejo': { description: 'Una semana ensayando. La conversación nunca pasó.' },
  'guarde-algo-para-nunca': { description: 'Una botella de champán. Cinco años. Sin abrir.' },
  'confundi-dia-festivo': { description: 'Llegué al trabajo. Estaba cerrado. Volví a casa contento.' },
  'me-apunte-reto-30-dias': { description: 'Día 4. Sin razón. Sin culpa.' },
  'llame-persona-equivocada': { description: 'Tres minutos hablando. Aún no era mi tía.' },
  'mande-voice-sin-querer': { description: 'A mi pareja. Sin grabar. Cero contenido.' },
  'compre-doble-lo-mismo': { description: 'Dos paquetes de café. Cero memoria.' },
  'me-asuste-con-mi-reflejo': { description: 'En el escaparate. Sin gafas. Cero conciencia espacial.' },
  'me-olvide-que-tenia-cita': { description: 'Médico. Treinta minutos tarde. Me cancelaron.' },
  'comi-en-orden-incorrecto': { description: 'Postre primero. La camarera lo permitió.' },
  'me-puse-jersey-al-reves': { description: 'Seis horas en la oficina así. Lo descubrí en el baño.' },
  'me-pase-de-parada-autobus': { description: 'Final de línea. Veinte minutos extra a casa.' },
  'compre-sin-necesitarlo': { description: 'Cuatro camisetas blancas. Tengo doce.' },
  'me-confundi-de-dia-cita': { description: 'Llegué un día antes. La doctora se rió.' },
  'me-despedi-con-beso-cuando-tocaba-mano': { description: 'Cliente importante. Cara de pánico mutua.' },
  'me-olvide-apagar-la-tele': { description: 'Tres días encendida. Llegué a casa con calefacción extra.' },
  'deje-para-manana': { description: 'Lleva pendiente desde hace dos semanas.' },
  'intente-abrir-puerta-sin-llave': { description: 'Cinco minutos peleándome. Vecino me miraba.' },
  'me-confundi-de-hora-cita': { description: 'Una hora antes. Una hora esperando solo.' },
  'guarde-numero-sin-nombre': { description: 'Tres años con "??". No me atrevo a llamar.' },
  'me-olvide-de-responder': { description: 'Tres semanas. Ya es imposible contestar.' },
  'me-olvide-de-colgar': { description: 'Sin "adiós". Sin más. Cero educación.' },
  'me-olvide-de-poner-sal': { description: 'Lentejas insípidas. Tres días para terminar la olla.' },
  'me-fui-gas-encendido': { description: 'Lo descubrí volviendo de viaje. Sin incidentes.' },
  'perdi-mi-propio-paraguas': { description: 'En el día más lluvioso del año.' },
  'me-perdi-en-mi-propio-barrio': { description: 'Veinte años viviendo aquí. Tres minutos de pánico.' },
  'compre-cargador-mismo-dia': { description: 'Doce euros. Original encontrado en el bolsillo.' },
  'me-equivoque-de-sobre': { description: 'La carta de amor a mi jefe. La de trabajo a mi pareja.' },
  'vi-mismo-capitulo-dos-veces': { description: 'Hasta el segundo acto. Lo recordé tarde.' },
  'me-rei-solo-recordando': { description: 'En el metro. La gente miraba. Cero contención.' },
  'cometi-error-google-maps': { description: 'Un kilómetro extra. Por una callejuela cerrada.' },
  'me-confundi-de-zapatillas': { description: 'Una blanca. Una negra. Llegué al trabajo así.' },
  'borre-foto-equivocada': { description: 'La de la boda. Mi favorita. Sin backup.' },
  'me-fui-sin-pagar': { description: 'Distraído con el móvil. Volví a las dos horas.' },
  'me-descargue-peli-equivocada': { description: 'Pensé que era el remake. Era la original de 1985.' },
  'meti-movil-lavadora': { description: 'En el bolsillo del pantalón. Ciclo completo.' },
  'me-di-cuenta-tarde-del-chiste': { description: 'Diez minutos después. Reí solo.' },
  'guarde-contrasena-donde-no-recuerdo': { description: 'En un papel. En algún cajón. En algún cuarto.' },
  'pague-aparcamiento-sin-coche': { description: 'Diez euros. El coche ya estaba en casa.' },
  'me-dormi-con-auriculares': { description: 'Enredados al cuello. Tres horas para sacarlos.' },
  'busque-app-descargada': { description: 'Diez minutos en la AppStore. Estaba en pantalla 3.' },
  'cogi-carrito-sin-moneda': { description: 'Volví. Cogí el carro. Volví a por la moneda.' },
  'me-olvide-de-apagar-la-luz': { description: 'Una semana de vacaciones. Factura impactante.' },
  'llegue-lugar-sin-saber-por-que': { description: 'En la cocina. Mirando la nevera. Cero plan.' },
  'empece-a-escribir-y-perdi-el-hilo': { description: 'Tres frases sin sentido. Borré todo.' },
  'me-fui-sin-lo-que-iba-a-buscar': { description: 'Volví dos veces. Sin recordar qué necesitaba.' },
  'hable-con-bot-pense-persona': { description: 'Le di las gracias. Tres veces. Sin respuesta.' },
  'respondi-antes-leer': { description: '"OK". Era una pregunta abierta. Cara de tonto.' },
  'me-rei-sin-saber-de-que': { description: 'En medio del funeral. Cero contención.' },
  'me-sente-silla-humeda': { description: 'Pantalón mojado dos horas. Cero solución.' },
  'mande-nota-de-voz-al-grupo': { description: 'Tres minutos. Sin saber a quién iba dirigido.' },
  'me-confundi-de-idioma-responder': { description: 'En italiano a alguien que hablaba español.' },
  'eche-algo-de-menos-demasiado-tarde': { description: 'Cuando ya era irrecuperable.' },
  'pregunte-algo-que-ya-me-habian-dicho': { description: 'Dos veces antes. Cara de la otra: poker.' },
  'me-mande-nota-a-mi-mismo': { description: 'En WhatsApp. Para no olvidarme. La olvidé igual.' },
  'me-quede-sin-datos': { description: 'Día 17 del mes. Cero internet. Pánico.' },
  'copie-mensaje-sin-querer-al-destinatario': { description: 'Captura de la conversación. A la propia persona.' },
  'me-quede-sin-plan': { description: 'Viernes 22h. En pijama. Sin remordimientos.' },
  'llame-persona-equivocada-en-alto': { description: 'Por nombre. En la oficina. Tres segundos de silencio.' },
  'me-queje-de-algo-que-yo-hice': { description: 'Diez minutos quejándome. Lo había hecho yo.' },
  'me-levante-sin-motivo-noche': { description: 'A las 4 AM. Cinco minutos en la cocina. Volví.' },
  'me-confundi-lado-coche': { description: 'Iba de copiloto. Subí al lado del conductor.' },
  'di-gracias-a-una-maquina': { description: 'Al cajero. En voz alta. La gente miró.' },
  'me-confundi-de-acceso-metro': { description: 'Salí en lugar de entrar. Cinco minutos perdidos.' },
  'intente-entrar-a-sitio-cerrado': { description: 'Empujé la puerta veinte segundos. Estaba cerrado.' },
  'puse-nombre-incorrecto-pedido': { description: '"María". No era yo. Recogí el café igual.' },
  'me-subi-autobus-equivocado': { description: 'Línea 23 vs 32. El número me confundió.' },
  'camine-mirando-movil-choque': { description: 'Con una farola. La gente filmó.' },
  'abuela-no-entiende-videollamada': { description: 'Me habla a la pantalla mientras se acerca.' },
  'madre-compra-ropa-talla-mal': { description: 'Talla XL. Soy M. "Por si engordas".' },
  'padre-pone-subtitulos': { description: 'A series en español. Por costumbre.' },
  'tia-pregunta-sueldo': { description: 'En la cena. Voz alta. Cero discreción.' },
  'hermano-pide-cargador': { description: 'Cada vez. Sin devolver. Sin pedir perdón.' },
  'madre-guarda-tuppers': { description: 'Tres armarios. Sin tapas que combinen.' },
  'abuela-manda-bendicion': { description: 'Cada mañana. Con emojis. A las 7 AM.' },
  'primo-cuenta-logros-suyos': { description: 'Ascensos. Viajes. Coches. Sin parar.' },
  'hermana-coge-ropa-sin-preguntar': { description: 'Me devolvió la blusa con manchas.' },
  'madre-avisa-que-llama': { description: '"Te llamo en cinco minutos". Llama en uno.' },
  'abuelo-historia-guerra': { description: 'La de las patatas. Cada Navidad.' },
  'cunada-dieta-vegana': { description: 'Cero queso. Cero leche. Cero pizza. Triste.' },
  'primo-pide-ayuda-mudanza': { description: 'Cada año. Cada vez le ayudo. Cero gracias.' },
  'familia-llega-visita-sin-avisar': { description: 'Sábado por la mañana. En pijama. Pánico.' },
  'abuela-pregunta-novia': { description: 'Cada vez que la veo. Sin filtros.' },
  'madre-se-preocupa-frio': { description: 'Treinta grados. "¿Llevas chaqueta?".' },
  'tio-explica-como-ahorrar': { description: 'Sin haber ahorrado en su vida.' },
  'hermano-olvida-cumpleanos': { description: 'Tres días tarde. Sin disculpa.' },
  'madre-no-espera-respuesta': { description: 'Pregunta. Responde. Cierra el tema.' },
  'abuelo-pide-ayuda-cajero': { description: 'Veinte minutos. Tres intentos. Una sonrisa.' },
  'prima-pide-favores-imposibles': { description: '"¿Me arreglas el ordenador?". Sin saber qué falla.' },
  'hermana-habla-suenos': { description: 'Con detalle. Cada elemento. Cada simbolismo.' },
  'tio-filosofia-sobremesa': { description: 'Sobre la vida. Sobre el amor. Sobre el café.' },
  'madre-llama-en-momentos-malos': { description: 'En la entrevista. En la cita. En el examen.' },
  'tia-recomienda-series-viejas': { description: 'CSI. Mentes Criminales. Lost. Veinte años atrás.' },
  'madre-llora-anuncio-navidad': { description: 'Lotería de Navidad. Cinco minutos. Cada año.' },
  'hermana-presta-ropa-no-devuelve': { description: 'Cuatro meses. Mi blusa nueva.' },
  'tio-aporta-soluciones-que-no-pedi': { description: 'Sin contexto. Sin pedirlo. Sin parar.' },
  'abuela-llama-noticias': { description: 'Cada vez que ve algo en TVE.' },
  'madre-pone-temperatura-alta': { description: 'En enero. Con calefacción a 28º. Yo en pantalón corto.' },
  'padre-no-escucha-primera-vez': { description: 'Dos veces. Tres veces. Hasta gritar.' },
  'hermano-mayor-sabe-todo': { description: 'Cada decisión mía revisada. Sin pedirlo.' },
  'madre-da-de-comer-sin-hambre': { description: '"Has perdido peso". Tres platos en la mesa.' },
  'tia-viaje-recomienda-restaurantes': { description: 'De los 90. Cero referencias actuales.' },
  'prima-pide-que-le-guste-fotos': { description: 'Cada foto. Cada día. Por WhatsApp.' },
  'padre-arregla-tecnologia-mal': { description: 'El router quedó peor. Tres días sin internet.' },
  'hermana-llora-el-dia-que-le-va-bien': { description: 'Buenas noticias. Lágrimas. Cero entendimiento.' },
  'cunado-cuenta-dinero-que-gana': { description: 'En cada cena. Sin que nadie pregunte.' },
  'abuela-da-propina-a-todos': { description: 'A los 30. A los 40. A los 50. Cinco euros.' },
  'madre-guarda-recibos-todo': { description: 'Tres cajones. Sin orden. Sin lógica.' },
  'me-cai-pasarela': { description: 'Sin obstáculos. Cero excusas.' },
  'di-propina-de-mas': { description: 'Treinta euros. La cuenta era de quince.' },
  'me-equivoque-de-cuarto-hotel': { description: 'Toqué tres puertas. La cuarta era la mía.' },
  'grite-en-silencio': { description: 'En el cine. Sin razón. Cero gracia.' },
  'me-rei-solo': { description: 'En el metro. La gente se apartó.' },
  'empuje-puerta-giratoria-mal': { description: 'En el banco. Tres minutos atascado.' },
  'me-cague-con-el-frio': { description: 'Esperando el bus. Cero baño cerca.' },
  'baile-solo-sin-musica': { description: 'En el centro comercial. Cinco segundos. Vergüenza.' },
  'me-cai-ascensor-saliendo': { description: 'En la planta de oficinas. Veinte personas mirando.' },
  'pregunte-precio-menu-sin-ver-carta': { description: 'Restaurante de tres estrellas. Cara del camarero.' },
  'aplaudi-en-presentacion-tecnica': { description: 'Sin que nadie aplaudiera. Vergüenza pura.' },
  'puse-altavoz-sin-querer': { description: 'Conversación íntima. En el metro. Voz alta.' },
  'confundi-policia-portero': { description: 'Le mandé pasar. Era de la Guardia Civil.' },
  'pregunte-que-pelicula-teatro': { description: 'En la entrada del Teatro Real.' },
  'pronuncie-mal-marca-famosa': { description: 'Hermès. Versace. Givenchy. Cero acertados.' },
  'llegue-fiesta-equivocada': { description: 'Con regalo. Vestido. Cero invitación.' },
  'llame-taxista-por-nombre-app': { description: 'Era otro Cabify. Cara de extrañeza.' },
  'me-confundi-de-sala-cine': { description: 'Me senté. La peli no era. Salí en silencio.' },
  'le-di-las-llaves-a-extrano': { description: 'Pensé que era el cerrajero. Era un vendedor.' },
  'confundi-cumpleanos-con-otro': { description: 'Felicité al de marzo en julio.' },
  'tuve-mancha-espalda-todo-el-dia': { description: 'Café. Visible. Ocho horas en la oficina.' },
  'me-queme-intentando-impresionar': { description: 'Pasta carbonara. Brasero en la cocina.' },
  'me-cai-silla-oficina': { description: 'Sin nadie cerca. Cero testigos. Cero validación.' },
  'confundi-jefe-cliente': { description: 'Le hablé en plan colega. Cinco minutos.' },
  'me-atranque-bano-ajeno': { description: 'Diez minutos. Tuve que pedir ayuda. Vergüenza.' },
  'hice-reverencia-sin-motivo': { description: 'Reflejo. En España. Cara de extrañeza mutua.' },
  'sali-sin-pagar-cafe': { description: 'Volví a los diez minutos. El camarero sonrió.' },
  'pregunte-si-estaba-abierto-dentro': { description: 'En medio del bar. Con clientes alrededor.' },
  'me-cai-con-bandeja-cafeteria': { description: 'Café. Magdalenas. Libro. Todo al suelo.' },
  'me-rie-chiste-propio': { description: 'Antes de terminarlo. Lo arruiné.' },
  'me-quede-en-blanco': { description: 'Pánico escénico. Treinta segundos de silencio.' },
  'me-puse-rojo-sin-motivo': { description: 'Me preguntó la hora. Reflejo automático.' },
  'hable-demasiado-nerviosismo': { description: 'En la entrevista. Cinco minutos sin parar.' },
  'me-meti-en-una-foto-ajena': { description: 'En el Coliseo. Eran japoneses.' },
  'pregunte-precio-en-voz-alta': { description: 'En la tienda de lujo. Cien euros más caro.' },
  'me-colgaron-en-plena-frase': { description: 'Cliente importante. Cero conexión.' },
  'confundi-escalera-ascensor': { description: 'Subí seis pisos pensando que era el ascensor.' },
  'entre-bano-equivocado': { description: 'Los lavabos. Tres mujeres sentadas. Pánico.' },
  'me-cruce-con-alguien-que-ignore': { description: 'Lo recordé tarde. Demasiado tarde.' },
  'hable-solo-en-voz-alta-transporte': { description: 'En el bus. La gente miraba.' },
  'respondi-por-hablar': { description: 'Sin haber escuchado. Lo notó. Yo me reí.' },
  'di-mal-la-mano': { description: 'Le di la izquierda. Era importante. Tres segundos de incomodidad.' },
  'confundi-arriba-con-abajo-edificio': { description: 'Bajé al sótano. Tenía reunión en la quinta.' },
  'me-sente-en-sitio-reservado': { description: 'En la boda. Vino el dueño. Tuve que levantarme.' },
  'me-quede-sin-bateria-haciendo-foto': { description: 'El amanecer perfecto. Cero captura.' },
  'pregunte-si-estaba-libre-ocupado': { description: 'Tirando de la puerta. Voz alta. Vergüenza.' },
  'me-confundi-de-tono-mensaje': { description: 'Mensaje serio. Emoji con risa. Cara de pánico.' },
  'no-encontre-la-salida-de-emergencia': { description: 'Acabé saliendo por la cocina. Cara del personal.' },
  'me-perdi-en-el-parking': { description: 'Veinte minutos. Cuatro plantas. Cero memoria.' },
  'quede-de-pie-todos-sentados': { description: 'En la conferencia. Cinco segundos de pánico.' },
  'me-tropece-entrando-tienda': { description: 'En la entrada. Sin obstáculo. Vergüenza pública.' },
  'mande-meme-incorrecto-grupo': { description: 'Al de familia. El de adultos. Pánico.' },
  'hice-un-chiste-raro-en-entrevista': { description: 'Silencio. Cara de poker del entrevistador.' },
  'di-nombre-equivocado-al-presentarme': { description: 'Mi propio apellido. Cero memoria.' },
  'me-olvide-de-colgar-cuando-debi': { description: 'Un minuto hablando solo. Ya habían colgado.' },
  'use-demasiada-colonia': { description: 'Toda la oficina lo notó. Tres compañeros me lo dijeron.' },
  'me-confundi-de-persona-en-dark': { description: 'Le hablé cinco minutos. No era él.' },
  'no-pude-abrir-el-envase': { description: 'Sushi. La camarera lo abrió. Vergüenza.' },
  'estornude-encima-de-comida': { description: 'En la mesa de al lado. Disculpa larga.' },
  'me-levante-palomitas-cine': { description: 'En el momento clave. Las palomitas rodaron.' },
  'hable-de-alguien-delante': { description: 'Con detalle. Estaba detrás. Cero forma de salir.' },
  'me-rei-al-recibir-mala-noticia': { description: 'Risa nerviosa. Cara de poker. Pánico.' },
  'me-puse-mal-con-emocion': { description: 'En la reunión de empresa. Sin razón.' },
  'confundi-ascensor-bano': { description: 'En el armario. Cara de la limpiadora.' },
  'dije-palabra-malsonante-delante-ninos': { description: 'Cinco años. Tres palabras. Cara de mi hermana.' },
  'firme-en-el-sitio-incorrecto': { description: 'El contrato del coche. Tres páginas mal.' },
  'me-pase-saludando': { description: 'Tres veces. Misma persona. Mismo día.' },
  'confundi-metro-con-cercanias': { description: 'Acabé en Móstoles. Tres horas perdido.' },
  'me-comi-la-decoracion': { description: 'Pensé que era hierba comestible. Era plástico.' },
  'deje-la-luz-puesta-toda-la-reunion': { description: 'Mi cuarto detrás. Visible. Vergonzoso.' },
  'desperte-sin-saber-donde': { description: 'Sin móvil. Sin idea de la ciudad.' },
  'me-gaste-el-alquiler': { description: 'En una sola noche. Sin recuerdos.' },
  'comi-kebab-antes-de-dormir': { description: 'Lo pedí. Me dormí. Llegó. Comí frío al despertar.' },
  'me-cayo-el-movil-en-el-inodoro': { description: 'En el bar. Lo recogí con servilletas. Lo lavé.' },
  'olvide-que-habia-pasado': { description: 'Llegué a casa. Cero memoria de cómo.' },
  'mande-meme-equivocado-borracho': { description: 'Al grupo de familia. Mi prima quince años.' },
  'baile-reggaeton-a-camara-lenta': { description: 'Subido a Instagram. Mil visualizaciones.' },
  'me-puse-cunado': { description: 'A las 3 AM. Hablé de criptos sin saber qué eran.' },
  'perdi-gorra-que-queria': { description: 'En la fiesta. Sin recuperar. Tres años después.' },
  'pague-dos-veces-barra': { description: 'Sin darme cuenta. El camarero no me dijo nada.' },
  'llame-a-alguien-que-no-debia': { description: 'A las 4 AM. A mi ex. Hablé media hora.' },
  'perdi-la-chaqueta-de-siempre': { description: 'La favorita. Cinco años conmigo. Adiós.' },
  'declare-amistad-eterna-a-desconocido': { description: 'En el baño. Lloré. Le di mi número.' },
  'me-fui-sin-movil': { description: 'Lo descubrí en el metro. Volví. Estaba donde lo dejé.' },
  'me-quede-en-el-bano-tiempo': { description: 'Dormido en el wáter. Mis amigos me sacaron.' },
  'me-cai-con-copa-en-mano': { description: 'Sin derramar. La gente me aplaudió.' },
  'hable-de-mis-sentimientos-con-todo-el-mundo': { description: 'Con desconocidos. Con camareros. Con todos.' },
  'perdi-las-gafas-de-sol': { description: 'En la fiesta. Cien euros. Sin recuperar.' },
  'me-acoste-con-zapatos': { description: 'Y abrigo. Y bolso. Sin desvestirme.' },

  // ===== v2-part-4 (242) ===============================================
  'quede-con-alguien-que-no-debia': { description: 'Lo sabía antes de quedar. Lo confirmé después.' },
  'borre-conversacion-importante': { description: 'A las 2 AM. Tres meses de mensajes. Sin backup.' },
  'me-comi-lo-del-dia-siguiente': { description: 'Sin pensarlo. A las 4 AM. Con remordimiento.' },
  'fui-a-misa-resacoso': { description: 'Con gafas de sol. Mi abuela no dijo nada.' },
  'me-hice-sangre': { description: 'Una herida en la rodilla. Sin recuerdo del cómo.' },
  'me-olvide-de-pagar-fiesta': { description: 'Me fui sin pagar entrada. Cero remordimientos.' },
  'hable-de-mi-ex-toda-la-noche': { description: 'A camareros. A desconocidos. A todo el bar.' },
  'me-puse-a-cantar-el-himno': { description: 'En el bar. Voz alta. Sin pedir permiso.' },
  'pedi-perdon-por-todo': { description: 'A las 3 AM. Por cosas de hace años.' },
  'me-sente-en-el-suelo-bar': { description: 'Cero sillas. Cero juicios. Cero dignidad.' },
  'perdi-billetera-la-encontre-manana': { description: 'En el congelador. Junto al chorizo.' },
  'me-puse-gafas-sol-de-noche': { description: 'Toda la noche. Tres horas. Cero visión.' },
  'me-confundi-de-piso-llegando-casa': { description: 'Cinco minutos peleándome con la cerradura.' },
  'comi-pizza-de-la-basura': { description: 'Acababa de tirarla. La rescaté. La comí.' },
  'me-acoste-con-maquillaje': { description: 'Despertar con la almohada negra.' },
  'me-puse-triste-nada': { description: 'A las 3 AM. Sin razón. Cinco minutos llorando.' },
  'me-cayo-comida-encima': { description: 'Salsa de tomate. Camisa blanca. Adiós.' },
  'me-dormi-hablando-con-alguien': { description: 'Llamada de tres minutos. Cero memoria.' },
  'le-preste-dinero-a-alguien-desconocido': { description: 'Veinte euros. Sin verlo más.' },
  'mande-nota-larga-innecesaria': { description: 'Seis minutos. Cero contexto. Mucho alcohol.' },
  'me-saque-foto-horrible-en-espejo-bano': { description: 'En el bar. Subida. Sin filtros.' },
  'me-arrepenti-del-tatuaje': { description: 'Tres días después. Sin posible eliminación.' },
  'discuti-con-desconocido': { description: 'Sobre el Real Madrid. Veinte minutos.' },
  'me-declare-sin-venir-a-cuento': { description: 'Sin razón. Sin esperanza. Sin futuro.' },
  'me-fui-de-la-fiesta-equivocado': { description: 'Salí. Acabé en otro bar. Cero idea.' },
  'me-quitaron-la-copa-de-la-mano': { description: 'Mis amigos lo vieron venir.' },
  'prometi-un-viaje': { description: 'A París. Con mis amigos. Sin reservar nunca.' },
  'me-confundi-de-casa': { description: 'A las 5 AM. Vecino salió en pijama.' },
  'me-olvide-de-llevar-llaves': { description: 'Dos horas en el portal. Lloviendo.' },
  'me-moje-los-pies-lluvia': { description: 'Sin recordar el chubasco. Cero paraguas.' },
  'desayune-lo-que-sobro-fiesta': { description: 'Tortilla seca. Patatas frías. Cero culpa.' },
  'me-cai-portal-borracho': { description: 'Vecino salió a buscarme. Me llevó arriba.' },
  'llame-jefe-noche': { description: 'Por error. A las 4 AM. Tres minutos hablando.' },
  'me-perdi-en-el-barrio-de-siempre': { description: 'Veinte años aquí. Tres horas perdido.' },
  'tarde-en-recordar-mi-nombre': { description: 'Cinco segundos. Cara de sospechoso.' },
  'bebi-agua-del-grifo-de-un-tiron': { description: 'De rodillas. Sin parar. Tres minutos.' },
  'me-puse-dos-zapatos-distintos': { description: 'Una negra. Una marrón. Salí a la fiesta.' },
  'no-encontre-el-bano': { description: 'Cinco minutos. En un bar de tres metros.' },
  'mande-audio-muy-largo-al-despertar': { description: 'Once minutos. A las 2 AM. Sin contexto.' },
  'me-dormi-comiendo': { description: 'Pasta a medias. Tenedor en mano. Cabeza en mesa.' },
  'prometi-dejar-de-beber': { description: 'Mientras pedía la siguiente. Cero coherencia.' },
  'llegue-a-casa-con-algo-ajeno': { description: 'Una gorra. Sin saber a quién.' },
  'me-puse-musica-a-tope-en-casa': { description: 'A las 3 AM. Vecinos llamaron al timbre.' },
  'dormi-en-el-taxi-de-vuelta': { description: 'Conductor me sacudió en el portal.' },
  'me-sente-en-el-suelo-de-casa': { description: 'Veinte minutos. Sin moverme. Sin razón.' },
  'le-pregunte-algo-absurdo-al-portero': { description: 'Si era de la familia. Tres minutos confundido.' },
  'busque-su-nombre-en-google': { description: 'Tres páginas. Cinco años. Cero respuesta.' },
  'quede-con-alguien-por-pena': { description: 'Sabía que no quería. Acudí igual.' },
  'le-guste-antes-de-que-me-gustara': { description: 'Cuando ya era tarde. Cuando ya no me importaba.' },
  'me-gusto-su-ex': { description: 'Sin saberlo. Hasta que me lo contó.' },
  'vi-a-mi-ex-con-mejor-aspecto': { description: 'Dos meses después. Pelo nuevo. Sonriendo.' },
  'fingi-no-volver-a-verle': { description: 'Crucé la calle. Tres semáforos. Cero contacto.' },
  'me-enamore-en-un-festival': { description: 'Tres días. Cero realidad. Sin contacto después.' },
  'empece-a-escuchar-su-musica': { description: 'Bad Bunny. Sin entenderlo. Por amor.' },
  'me-hice-el-interesante': { description: 'Tres días sin responder. Lo notó.' },
  'me-rechazaron-con-clase': { description: 'Sin gritar. Con cariño. Dolió igual.' },
  'deje-cosas-en-casa-de-mi-ex': { description: 'Para volver. Volví. Pero no volvimos.' },
  'fui-a-sitio-de-mi-ex': { description: 'Esperando cruzármelo. No estaba.' },
  'me-gusto-alguien-casado': { description: 'Anillo en el dedo. Yo en negación tres meses.' },
  'pregunte-por-el-a-sus-amigos': { description: 'Sin parecer interesado. Lo notaron.' },
  'me-dejaron-por-telefono-en-publico': { description: 'En el supermercado. Llorando entre cereales.' },
  'me-bloqueo-en-redes': { description: 'Sin explicación. Cinco años después sigo sin saber.' },
  'tuve-relacion-de-verano': { description: 'Sabía que no duraría. La disfruté igual.' },
  'me-puse-celoso-de-nadie': { description: 'Sin pareja. Sin razón. Cero lógica.' },
  'no-entendi-que-era-una-cita': { description: 'Hasta que pidió la cuenta y dijo "yo invito".' },
  'me-compararon-con-serie': { description: '"Eres como Ross". Lo dijo en serio.' },
  'fingi-no-haber-visto-su-historia': { description: 'La vi tres veces. Disimulé.' },
  'me-gusto-alguien-de-mi-trabajo': { description: 'Lo dije al equipo. Mal.' },
  'invente-excusa-para-verle': { description: 'Préstame un libro. Cualquier libro.' },
  'me-rechazaron-con-el-mejor-amigo': { description: 'Doble pérdida. Misma noche.' },
  'sigo-con-el-numero-guardado': { description: 'Como "no contestar". Sigo sin contestar.' },
  'fui-a-buscar-a-alguien': { description: 'A su trabajo. Sin avisar. Cara de pánico.' },
  'estuve-con-alguien-que-no-sentia-nada': { description: 'Tres meses. Por costumbre. Por miedo.' },
  'me-dieron-lastima': { description: 'Seis meses por compasión. Cero amor.' },
  'cambie-mis-planes-por-alguien': { description: 'Toda mi semana. Por una llamada. Por nada.' },
  'lleve-de-vacaciones-a-quien-no-debia': { description: 'Una semana sin hablarnos. En Bali.' },
  'tuve-primera-cita-con-alguien-del-grupo': { description: 'Cero futuro. Mucho drama. Cero amistad después.' },
  'me-prometi-no-volver-a-querer': { description: 'Tres semanas sin caer. Caí.' },
  'no-supe-que-significaba-lo-nuestro': { description: '"Ni novios ni amigos". Cero label. Mucho dolor.' },
  'cambie-cancion-al-escucharla': { description: 'Era nuestra. La escuché tres segundos. Pasé.' },
  'me-escribio-en-san-valentin': { description: 'Sin tener nada. Sin hablar en seis meses.' },
  'vi-a-mi-ex-rehacer-su-vida': { description: 'En tres meses. Yo seguía igual.' },
  'pense-que-era-senal': { description: 'Una canción. Una coincidencia. Cero universo hablando.' },
  'mande-flores-sin-reciprocidad': { description: 'Cincuenta euros. "Gracias :)". Punto.' },
  'me-pidio-que-fuera-su-amigo': { description: 'Cara a cara. Cero sutileza.' },
  'le-puse-al-dia-de-mi-vida': { description: 'Cinco páginas de WhatsApp. Sin que pidiera.' },
  'me-enamore-del-personaje-no-de-la-persona': { description: 'Lo construí en mi cabeza. No existía.' },
  'me-mandaron-de-vuelta-a-zona-amiga': { description: 'Salí. Volví. Salí. Volví.' },
  'estuve-esperando-que-me-llamara': { description: 'Tres horas con el móvil en la mano.' },
  'fui-a-un-evento-que-no-me-gustaba': { description: 'Concierto de techno. Yo lo odio. Lo aguanté.' },
  'no-reconoci-senales-claras': { description: 'Cero respuestas. Cero llamadas. Yo seguía intentándolo.' },
  'me-puse-en-plan-intenso': { description: 'A la primera cita. Le hablé del futuro.' },
  'discutimos-en-un-viaje': { description: 'En Roma. Cuatro días. Sin hablarnos.' },
  'me-enamore-en-ano-bisiesto': { description: 'Cuatro años después. Sigue siendo importante.' },
  'me-gusto-alguien-de-quien-me-habia-quejado': { description: 'A mis amigos. Tres meses despotricando.' },
  'me-dejaron-en-un-buen-momento': { description: 'Estábamos bien. Sin razón aparente.' },
  'me-mando-el-audio-equivocado': { description: 'Era para otra. Hablando de mí. Mal.' },
  'empece-a-ver-su-serie': { description: 'Para tener tema. La aborrezco.' },
  'me-entere-que-le-gustaba-por-terceros': { description: 'Por su mejor amigo. En una boda. Tarde.' },
  'le-di-like-sin-querer-en-foto-antigua': { description: '2017. Pánico. Lo retiré tarde.' },
  'me-fui-antes-de-que-me-dejaran': { description: 'Vi venir el final. Adelanté el adiós.' },
  'comparti-algo-que-no-debia': { description: 'En la primera cita. Cara de espanto.' },
  'me-compararon-con-su-padre': { description: 'Cero halago. Mucho subtexto.' },
  'me-dejo-en-visto-tres-dias': { description: 'Sin explicación. Sin avisos. Cero respuesta.' },
  'me-queje-de-no-tener-pareja-con-pareja': { description: 'Delante de quien quería ser mi pareja. Mal.' },
  'me-bloqueo-y-luego-me-desbloqueo': { description: 'Sin decir nada. Sin disculpa. Sin contexto.' },
  'me-di-cuenta-tarde': { description: 'Cuando ya no podía hacer nada.' },
  'vi-photo-antigua-juntos': { description: 'Sin querer buscarla. Al desplazar la galería.' },
  'tuve-celos-de-mi-propio-amigo': { description: 'Sin razón. Tres meses raro con él.' },
  'me-acostumbre-a-algo-que-ya-no-existia': { description: 'Esperando un mensaje que no llegaría.' },
  'no-volvi-a-hablar-tras-la-ruptura': { description: 'Cinco años. Cero contacto. Cero memoria.' },
  'me-aplaudieron-en-reunion-sin-querer': { description: 'No entendí qué dije. Asentí.' },
  'puse-fuera-de-oficina-sin-estarlo': { description: 'Tres días en casa pasando. Cero culpa.' },
  'me-quede-sin-tinta-impresora': { description: 'Justo antes de la presentación. Cero solución.' },
  'tuve-reunion-que-se-podia-email': { description: 'Noventa minutos. Cero decisiones.' },
  'comi-solo-todos-los-dias': { description: 'En mi mesa. Mirando el móvil. Tres años.' },
  'me-pusieron-al-mando-sin-avisar': { description: 'Lunes a las 9. "Tú lo lideras". Sin contexto.' },
  'no-lei-el-correo-con-info-clave': { description: 'En la reunión preguntaron. Inventé respuesta.' },
  'menti-sobre-conocer-herramienta': { description: 'Salesforce. Cero idea. Aprendí en YouTube ese mes.' },
  'me-bloquearon-el-acceso': { description: 'El primer día. Sin teléfono de IT. Cero ayuda.' },
  'me-confundi-de-cliente': { description: '"Buenos días, María". Era Carmen. Pánico.' },
  'me-pusieron-en-copia-error': { description: 'Hilo de jefes hablando de mí. Lo leí entero.' },
  'tuve-jefe-mas-joven': { description: 'Cinco años menos. Cero deferencia. Mucho ego.' },
  'perdi-un-archivo-importante': { description: 'Sin backup. Cero papelera. Cero esperanza.' },
  'me-fui-sin-cerrar-sesion': { description: 'Compañero curioso. Mensaje suyo en mi nombre.' },
  'di-presentacion-a-destiempo': { description: 'Tres minutos antes. La gente entrando aún.' },
  'me-olvide-poner-firma': { description: 'Veinte correos. Cero formalidad. Vergüenza.' },
  'pregunte-algo-ya-en-la-web': { description: 'Cliente respondió con el link.' },
  'me-cambie-de-equipo-voluntariamente': { description: 'Pensé que mejoraría. Empeoró.' },
  'abri-correo-de-otro': { description: 'Por error. Cero forma de cerrarlo sin verlo.' },
  'tuve-companero-que-no-trabajaba': { description: 'Tres años cobrando. Cero deliverables. Cero despido.' },
  'guarde-mal-el-proyecto': { description: 'Encima del anterior. Tres meses borrados.' },
  'llegue-tarde-excusa-ninos': { description: 'Sobrino imaginario. Universal. Cero verificación.' },
  'me-cole-en-reunion-equivocada': { description: 'Cinco minutos asintiendo. Eran de otra empresa.' },
  'firme-con-el-boligrafo-muerto': { description: 'Cliente esperando. Yo apretando. Cara de pánico.' },
  'puse-fondo-gracioso-sin-querer': { description: 'Beach scene. Reunión con CEO. Pánico.' },
  'me-olvide-de-actualizar-el-estado': { description: 'Verde toda la mañana. Sin trabajar.' },
  'tuve-jefe-que-desaparecia': { description: 'Dos semanas sin responder. Sin avisar.' },
  'comi-comida-de-otro-frigorifico': { description: 'Mi nombre en el táper. Pero no era mío.' },
  'me-fui-antes-de-hora': { description: 'Diez minutos. Sin que nadie viera. Cero culpa.' },
  'me-pusieron-en-cc-por-error': { description: 'Correo sobre mi rendimiento. Lo leí entero.' },
  'tuve-videoconferencia-en-pijama': { description: 'Camisa formal. Pijama Star Wars. Tuve que levantarme.' },
  'me-llamo-el-cliente-directo': { description: 'Saltando jerarquía. Pánico. Resolví bien.' },
  'di-mi-opinion-sin-pedirla': { description: 'En la reunión. Cero contexto. Cara de extrañeza.' },
  'me-confundi-de-asunto': { description: '"RE: Reunión semanal" para algo distinto. Cliente confuso.' },
  'me-quede-sin-descanso': { description: 'Cuatro horas sin agua. Sin café. Sin parar.' },
  'tuve-que-pedir-perdon-al-cliente': { description: 'Por algo de mi compañero. Asumí la culpa.' },
  'me-equivoque-de-empresa-al-escribir': { description: 'En el documento. Cero corrección. Cliente lo notó.' },
  'tuve-evaluacion-que-no-esperaba': { description: 'Lunes a las 10. Sin avisos. Pánico.' },
  'me-llamaron-de-recursos-humanos': { description: 'Para "actualizar tu DNI". Pánico igual.' },
  'use-empresa-anterior-para-comparar': { description: '"En mi anterior trabajo...". Cero recibimiento.' },
  'me-mandaron-tareas-viernes-tarde': { description: 'A las 18:30. "Para lunes". Mi pareja me odió.' },
  'tuve-companero-ruidoso': { description: 'Comía con la boca abierta. Tres años así.' },
  'llegue-a-la-empresa-sin-contrato': { description: 'Tres semanas trabajando. Sin firmar nada.' },
  'conteste-sin-leer': { description: '"OK". Era una pregunta abierta. Pánico.' },
  'no-sabia-como-usar-la-cafetera': { description: 'Un mes sin tomar café en la oficina.' },
  'tuve-el-mismo-sueldo-tres-anos': { description: 'Sin subida. Sin promoción. Solo "en revisión".' },
  'me-olvide-de-adjuntar': { description: 'Tres minutos después: "Ahora sí va el adjunto".' },
  'tuve-reunion-con-micro-abierto-en-bano': { description: 'Cinco minutos en directo. Pánico colectivo.' },
  'me-bajo-la-tension-de-pie': { description: 'En la cola del banco. Casi me caigo.' },
  'me-pico-algo-en-la-nariz': { description: 'En medio de la presentación. Cero discreción.' },
  'me-clave-la-una': { description: 'Sin razón. Sin haberla cortado. Sangre.' },
  'me-torci-pulsera': { description: 'Demasiado apretada. Tres días con muñeca hinchada.' },
  'me-hice-dano-abrochando-cinturon': { description: 'Sin entender cómo. Moratón en el hombro.' },
  'me-lastime-jugando-con-gato': { description: 'Sin razón. Tres arañazos. Cara de poker.' },
  'dormi-raro-semana': { description: 'Sin pesadillas. Sin lógica. Cansancio total.' },
  'me-clave-aguja-costura': { description: 'Sin saber coser. Sangre en la camisa.' },
  'me-atragante-con-chicle': { description: 'Después de horas masticándolo. Tos.' },
  'me-queme-planchando-camiseta': { description: 'Con la mano. Cicatriz visible.' },
  'me-golpee-ojo-con-gafas': { description: 'Quitándomelas. Moratón violeta. Tres días.' },
  'me-cai-doblando-ropa': { description: 'En la cama. Cero gracia. Mucho dolor.' },
  'me-hice-pupa-abriendo-lata': { description: 'Cuatro puntos. Lata de atún.' },
  'me-lastime-subiendo-escalera-dos': { description: 'En tres segundos. Tobillo torcido.' },
  'me-raspe-con-silla-madera': { description: 'En la pierna. Astilla. Sangre.' },
  'me-golpee-cabeza-ducha': { description: 'Tres veces. Mismo grifo.' },
  'me-clave-la-llave-en-la-mano': { description: 'Bolsillo del pantalón. Movimiento brusco.' },
  'me-pellizce-con-cierre': { description: 'Cremallera. Dedo atascado. Pánico.' },
  'me-dio-dolor-espalda-estirando': { description: 'Tres días sin poder agacharme.' },
  'me-hice-ampolla-zapato-nuevo': { description: 'En el tacón. Cojeé todo el día.' },
  'me-maree-sol-fuerte': { description: 'Cuarenta grados. Sin sombra. Casi me caigo.' },
  'me-irrite-el-ojo-sin-razon': { description: 'Sin tocarlo. Sin polvo. Tres días rojo.' },
  'me-pinche-dedo-con-hoja': { description: 'Papercut. Sin parar de sangrar.' },
  'me-cai-banera': { description: 'Resbalé saliendo. Moratón en la cadera.' },
  'me-queme-orejas-sol': { description: 'Sin crema. Cero protección.' },
  'me-electrocute-enchufe': { description: 'Levemente. Pero asustó.' },
  'me-clave-alfiler-ropa': { description: 'Camisa nueva. Sin quitar el plástico.' },
  'me-di-con-gaveta': { description: 'Cajón abierto. Levantándome de la silla. Vergüenza.' },
  'me-corte-lengua-sobre': { description: 'Pegando un sobre con saliva. Sangre.' },
  'dormi-aeropuerto-con-cuello': { description: 'Almohada inflable. Sin vergüenza alguna.' },
  'comi-solo-en-restaurante-caro': { description: 'Mesa para uno. Vino tinto. Sin remordimientos.' },
  'me-perdi-en-un-pueblo': { description: 'Trescientos habitantes. Cero datos. Cero señalización.' },
  'tuve-conductor-peligroso': { description: 'Pasó tres semáforos en rojo. Yo agarrado al asiento.' },
  'vi-algo-increible-sin-foto': { description: 'Sin móvil. Lo memoricé. Sigue ahí.' },
  'me-quede-sin-reserva-hotel': { description: 'En el mostrador. Sin disculpas. Cero alternativa.' },
  'comi-de-pie-en-la-calle': { description: 'Bocadillo de calamares. En Madrid. Sin sentarme.' },
  'me-perdi-la-ultima-visita-del-dia': { description: 'Diez minutos tarde. Cero piedad del guardia.' },
  'dormi-en-saco-suelo': { description: 'En una cabaña. Sin colchón. Cero quejas.' },
  'me-equivoque-de-terminal': { description: 'En Barajas. Casi pierdo el vuelo. Tres trenes.' },
  'pague-propina-que-no-debia': { description: 'En Japón. Cara de extrañeza del camarero.' },
  'no-supe-pagar-metro': { description: 'En Berlín. Cinco minutos en la máquina.' },
  'pedi-en-idioma-incorrecto': { description: 'Italiano en Roma. Me trajeron lo equivocado.' },
  'me-queme-dos-veces': { description: 'Mismo viaje. Mismas hombros. Cero aprendizaje.' },
  'llegue-ciudad-sin-mapa': { description: 'Cero datos. Cero hotel ubicado. Tres horas perdido.' },
  'fui-noche-a-sitio-cerrado': { description: 'En obras. Cero aviso. Cero foto.' },
  'compre-recuerdo-roto': { description: 'En la maleta. Pánico. Pegamento al rescate.' },
  'me-enganaron-cambio': { description: 'Veinte euros menos. Lo descubrí en el hotel.' },
  'me-quede-sin-bateria-foto-importante': { description: 'El amanecer perfecto. Sin captura.' },
  'dormi-con-desconocidos-en-furgoneta': { description: 'Surf trip. Cinco personas. Cero espacio.' },
  'me-perdi-ruta-senderismo': { description: 'Con señalización. Cero atención.' },
  'llegue-aeropuerto-con-desvio': { description: 'El taxi me llevó por toda la ciudad.' },
  'me-retuvieron-en-aduana': { description: 'Por confusión con otro pasajero. Tres horas.' },
  'olvide-voltaje-adaptador': { description: 'EE.UU. Cero adaptador. Cargador inservible.' },
  'me-esperaron-todos-en-el-autobus': { description: 'Treinta personas mirándome. Pánico al subir.' },
  'perdi-sombrero-en-viento': { description: 'Frente al mar. Cero recuperable.' },
  'me-queje-del-tiempo': { description: 'Llovió todo el viaje. Reservas no reembolsables.' },
  'me-meti-en-playa-privada': { description: 'Sin saberlo. Vino el guardia. Vergüenza.' },
  'llegue-sin-dinero-local': { description: 'Cero cajeros. Cero tarjeta aceptada. Pasé hambre.' },
  'me-bebi-agua-del-grifo-que-no-debia': { description: 'En México. Tres días en cama.' },
  'me-comi-algo-demasiado-picante': { description: 'En Tailandia. Llevé tres vasos de agua.' },
  'me-confundi-de-moneda': { description: 'Pagué con coronas en un país que usa euros.' },
  'me-vieron-en-fotos-de-desconocidos': { description: 'En Roma. En Nueva York. En todas partes.' },
  'hice-mejor-foto-de-mi-vida': { description: 'En un viaje no planeado. Cero filtros.' },
  'llegue-sin-ropa-de-abrigo': { description: 'A Helsinki en febrero. Pánico al salir.' },
  'tuve-companero-viaje-insoportable': { description: 'Habló doce horas seguidas. Sin parar.' },
  'me-encasquille-maleta': { description: 'En la cinta. Cero soluciones. Vergüenza.' },
  'llegue-con-fiebre': { description: 'Treinta y nueve grados. Tres días en la cama.' },
  'me-cobaron-tasa-turista': { description: 'Veinte euros extra. Cero aviso.' },
  'abri-regalo-sin-esperar': { description: 'Una semana antes. Cero paciencia.' },
  'deje-grifo-abierto': { description: 'Tres horas. Vecino me llamó. Pánico.' },
  'me-confundi-de-fila': { description: 'Diez minutos esperando. Era de otro mostrador.' },
  'gaste-en-suscripcion-olvidada': { description: 'Un año pagando. Sin usar. Cancelada al fin.' },
  'me-dormi-en-tren-de-pie': { description: 'Tres segundos. Caí sobre el de al lado.' },
  'me-equivoque-de-boton-ascensor': { description: 'Cuatro veces. Misma planta. Cero memoria.' },
  'perdi-paraguas-nuevo': { description: 'En el primer día. En el primer bar.' },
  'me-confundi-de-llave': { description: 'Tres minutos peleándome. Llave del trabajo.' },
  'olvide-apagar-la-radio': { description: 'Dos días encendida. Vecino se quejó.' },
  'me-olvide-de-la-compra-en-caja': { description: 'Una bolsa entera. Sin recuperar.' },
  'compre-algo-que-ya-tenia': { description: 'Mismo libro. Misma edición. Cero memoria.' },
  'me-levante-sin-despertador': { description: 'Cinco minutos antes. Cero culpa.' },
  'me-confundi-de-direccion': { description: 'Calle invertida. Tres horas conduciendo.' },
  'me-sente-encima-mando': { description: 'Cambié al canal de teletienda. Tres minutos así.' },
  'me-deje-las-gafas-en-casa': { description: 'En la consulta del optometrista. Cero idea.' },
};
