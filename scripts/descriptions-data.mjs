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
};
