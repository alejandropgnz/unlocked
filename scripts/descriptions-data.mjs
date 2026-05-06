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
};
