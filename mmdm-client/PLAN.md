

core ux
=======


options:

1. clicking on a die displays options for that die, e.g.
  * clicking a fieldable character die shows an option for "Field". clicking that option puts the UI into a modal state of "select <zap> + 2 energy" or "cancel", then "confirm" appears when required resources have been selected

2. there are generic options in the list of actions - "buy dice", "field dice", "reroll dice" - which lead to one or more rounds of selecting dice



assumptions:
* all moves are enumerable - querying phase, globals and dice in play will enumerate *all* relevant moves
* each move can have required preconditions - 
