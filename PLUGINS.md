# plugins

## containers

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::

::: danger STOP
Danger zone, do not proceed
:::

::: details 代码

```js{2}
console.log("Hello, VuePress!")
console.log("Hello, SwtcLib!")
```

:::

## vue-typed-js

<vue-typed-js :strings="items">
  <p>My favourite city is <span class="typing"></span></p>
</vue-typed-js>

<script>
export default {
  data () {
      return {
          items: [
            'Ealing',
            'Kilmarnock',
            'Newport',
            'Kensington',
            '...', 
            'Dagenham',
            'Liverpool',
            'Saint Helens',
            'Knowsley'
          ]
      }
  },
}
</script>

## mermaid

<mermaid>
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
</mermaid>

<mermaid>
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
</mermaid>

<mermaid>
graph LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
</mermaid>

<mermaid>
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
</mermaid>

<mermaid>
stateDiagram
    [*] --> First
    First --> Second
    First --> Third
    state First {
        [*] --> fir
        fir --> [*]
    }
    state Second {
        [*] --> sec
        sec --> [*]
    }
    state Third {
        [*] --> thi
        thi --> [*]
    }
</mermaid>

<mermaid>
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
</mermaid>

## video

<video width="560" height="240" controls>
  <source src="https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<iframe width="560" height="315" src="https://www.youtube.com/embed/bTqVqk7FSmY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<iframe src="https://player.vimeo.com/video/143418951" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/143418951">&quot;View From A Blue Moon&quot; Trailer</a> from <a href="https://vimeo.com/johnjohnflorence">John John Florence</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
