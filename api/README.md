# vertigo-boot

## Différents mode de démarrage

Dans le fichier `web.xml` se situant dans `src/main/webapp/WEB-INF/web.xml` on peut régler le mode de démarrage:

- Démarrage en mode embeded

```xml
<param-value>/boot/components/core.xml;/boot/components/foundation.xml;/boot/components/db.xml;/boot/components/search-embedded.xml;/boot/components/services.xml;/boot/components/webservices.xml</param-value>

```

- Démarrage en mode distant

```xml
<param-value>/boot/components/core.xml;/boot/components/foundation.xml;/boot/components/db.xml;/boot/components/search-distant.xml;/boot/components/services.xml;/boot/components/webservices.xml</param-value>
```