GridPack
========

A grid packer / unpacker module.

Usage
-----

```javascript
var gridPack = new GridPack();

gridPack.grid = [
    {x:0,y:1,w:1,h:3,id:'f'},
    {x:0,y:0,w:9,h:1,id:'e'},
    {x:1,y:1,w:4,h:2,id:'a'},
    {x:5,y:1,w:2,h:1,id:'b'},
    {x:5,y:2,w:2,h:1,id:'c'},
    {x:5,y:3,w:2,h:1,id:'h'},
    {x:1,y:3,w:4,h:1,id:'g'},
    {x:7,y:1,w:2,h:1,id:'i'},
    {x:7,y:2,w:2,h:1,id:'j'},
    {x:7,y:3,w:2,h:1,id:'k'},
];

gridPack.pack();
```

Now, gridPack.grid will be :

```javascript
[
  {
    "w": 9,
    "h": 4,
    "children": [
      {
        "x": 0,
        "y": 0,
        "w": 9,
        "h": 1,
        "id": "e"
      },
      {
        "w": 9,
        "h": 3,
        "children": [
          {
            "w": 8,
            "h": 3,
            "children": [
              {
                "w": 8,
                "h": 1,
                "children": [
                  {
                    "x": 7,
                    "y": 3,
                    "w": 2,
                    "h": 1,
                    "id": "k"
                  },
                  {
                    "x": 1,
                    "y": 3,
                    "w": 4,
                    "h": 1,
                    "id": "g"
                  },
                  {
                    "x": 5,
                    "y": 3,
                    "w": 2,
                    "h": 1,
                    "id": "h"
                  }
                ],
                "x": 1,
                "y": 3
              },
              {
                "w": 8,
                "h": 2,
                "children": [
                  {
                    "w": 4,
                    "h": 2,
                    "children": [
                      {
                        "w": 4,
                        "h": 1,
                        "children": [
                          {
                            "x": 7,
                            "y": 2,
                            "w": 2,
                            "h": 1,
                            "id": "j"
                          },
                          {
                            "x": 5,
                            "y": 2,
                            "w": 2,
                            "h": 1,
                            "id": "c"
                          }
                        ],
                        "x": 5,
                        "y": 2
                      },
                      {
                        "w": 4,
                        "h": 1,
                        "children": [
                          {
                            "x": 7,
                            "y": 1,
                            "w": 2,
                            "h": 1,
                            "id": "i"
                          },
                          {
                            "x": 5,
                            "y": 1,
                            "w": 2,
                            "h": 1,
                            "id": "b"
                          }
                        ],
                        "x": 5,
                        "y": 1
                      }
                    ],
                    "x": 5,
                    "y": 1
                  },
                  {
                    "x": 1,
                    "y": 1,
                    "w": 4,
                    "h": 2,
                    "id": "a"
                  }
                ],
                "x": 1,
                "y": 1
              }
            ],
            "x": 1,
            "y": 1
          },
          {
            "x": 0,
            "y": 1,
            "w": 1,
            "h": 3,
            "id": "f"
          }
        ],
        "x": 0,
        "y": 1
      }
    ],
    "x": 0,
    "y": 0
  }
]
```

You can access packed / unpacked version using :

```javascript
gridPack.packed();
gridPack.unpacked();
```