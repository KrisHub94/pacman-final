/**
Rules:
Kris : Pacman Movements
Hadi: initializing walls
Fill : Scores points
**/

# Pacman

We're gonna implement our version of the classic 1980's arcade game: **Pac-Man**!
This game will not be completely historically accurate to the classic game.
But you can make it accurate if you want to!

## Tasks

You can find **image assets** in the provided `./assets/` folder.  
You can use any images you want, but feel free to create your own sprites!

### Game Loop

We will need to setup our main game loop, which will run most
of our game logic every frame, including:

- **Pacman** movement
- **ghosts** AI and movement
- **pellet** and **power pellet** collection
- rendering our game elements

We will implement these features in the upcoming tasks.  
For now, create an `update` function which is run approximately
**60 times per second**. You can use `setInterval` for this.

- Create an `update` function which runs at 60 FPS.
- Write a `console.log` in the `update` function to verify
  that it is being run every frame.

### Controllable Pacman

Let's create a **Pacman** HTML element, which moves on its
own and can be controlled using the arrow keys!

- Create an HTML element with a Pacman image and insert it into the DOM.  
  You can use the already existing Pacman HTML element in the starter code.  
  You'll find example images in the provided `./assets/` directory.
- Pacman is always moving into one direction.  
  We can use **absolute positioning** with CSS to freely move our element around.
- When the player presses an arrow key, Pacman moves into this new direction.
- When Pacman moves off-screen, they should loop back and appear
  at the other side of the screen.

### Animate Pacman

Pacman should be animated. It's mouth should open and close.  
You can use the provided Pacman sprites in the `./assets/images/pacman/` directory.

- Animate Pacman by changing its image in regular intervals, frame-by-frame.

### Walls

We'll need some solid walls, which Pacman (and later on Ghosts)
cannot move through. These walls will be used to create our level later on.

- Create some wall HTML elements and place them somewhere in our game.  
  You can use the provided `./assets/images/wall.png` image.
  <small>It's just a black square. You could probably be more creative than me.</small>
- Check when **Pacman** is in collision with any wall.  
  You can use an [AABB] collision detection implementation for this.
- When **Pacman** is moving, it cannot move through the walls.

### Pellets

Pellets are the tiny yellow dots scattered throught a typical Pacman level.  
**Pacman** collects, or **eats** these dots to gain **score** points.

- Create some HTML elements for our pellets.  
  You can use the provided `./assets/images/pellet/pellet.png` image.
- Check for collision between Pacman and our pellets.
- When Pacman is touching any pellet, they **eat** it, which does the following:
  - Removes the pellet from the game.
  - Increments our **score** (traditionally by `10` points).

### Ghosts

In Pacman, there are **four Ghosts**:

- **Blinky**, the red one, simply follows Pacman around.
- **Pinky**, the pink one, is always 4 steps ahead of Pacman.
- **Inky**, the blue or cyan one, moves relative to Pacman's and Blinky's positions.
- **Clyde**, the orange one, moves like Pinky, but gets scared and runs away when he gets too close to Pacman.

Let's start by creating four Ghosts, which all follow Pacman.
If they catch Pacman, it's **game over**!

- Create four Ghost elements, which can also move around.
- They cannot move through our solid walls.
- They all try to move towards Pacman's position.

### Optional: Traditional Ghost AI

If you're feeling up to it, you can try to implement the
traditional Pacman Ghost AI by following this optional task.  
Otherwise it's fine if the Ghosts simply try to follow Pacman,
or you can try to invent your own Ghost movement AI!

<details>
<summary>Traditional Ghost AI description</summary>

#### Ghost Modes

The Ghosts can be in one of **two modes**:

- **Chase** mode,
  the default mode where the Ghost tries to chase down Pacman,
  using it's personal chase behavior, as described below.
- **Scatter** mode,
  in this mode each Ghost will try to move into a different corner of the game area,
  to spread out across the level. Each Ghost has its own dedicated corner,
  which are mentioned below.

The game will continuously switch between **Scatter** and **Chase** mode.
So all Ghosts will either be chasing, or scattering together at the same time.  
The game starts in **Scatter** mode, and after `7` seconds switches to **Chase** mode.  
Then after chasing for `20` seconds, switches back to **Scatter** mode.
This loop continues throughout the entire game.

#### Ghost Behaviors

- **Blinky**  
  **Chase behavior**: Simply moves exactly towards Pacman's current position.  
  **Scatter corner**: Top-Right corner.
- **Pinky**  
  **Chase behavior**: Moves 4 tiles ahead of Pacman, in the direction Pacman is currently moving.  
  **Scatter corner**: Top-Left corner.
- **Inky**  
  **Chase behavior**: Moves relative to the positions of Pacman and Blinky.
  It calculates its target position using the following steps:

  - Find the position 2 tiles ahead of Pacman.
  - Subtract Blinky's position from that position.
  - Multiply the position by 2.
  - Add this position to Blinky's position.
  - This final calculated position is Inky's target position!

  Here these steps are, represented in pseudo-code:

  ```
  target = pacman.position + 2       // 2 tiles ahead of pacman
  target = target - blinky.position  // subtract blinky's position
  target = target * 2                // multiply position by 2
  target = target + blinky.position  // add blinky's position again
  ```

  **Scatter corner**: Bottom-Right corner.

- **Clyde**  
 **Chase behavior**: Moves differently depending on how close he is to Pacman.  
 When he's 8 tiles away or further, then he moves like **Pinky**.
When he's less than 8 tiles away, he moves as if he were in Scatter mode,
retreating to his corner.  
 **Scatter corner**: Bottom-Left  
 <small>BTW, why is his name _Clyde_?</small>
</details>

### Power Pellets

Power pellets are typically big blue pellets.  
When Pacman eats a power pellet, he'll make the Ghosts enter
**Fright mode**, which allows Pacman to **eat the Ghosts**!
Eating a Ghost will add some **score points** and temporarily **kill** the ghost.
The more Ghosts Pacman manages to eat during Fright mode, the more points
the player will get.  
During **Fright mode**, the Ghosts will change their **appearance** and
frantically move around **randomly**.  
After some time, the Ghosts will go back to chasing Pacman.

- Create and place `4` power pellet HTML elements in the game.  
  You can use the provided `./assets/images/pellet/power-pellet.png` image.
- When Pacman collides with a power pellet, he **eats it**:
  - Removes the eaten power pellet from the game.
  - The player gets `50` **score points**.
  - The Ghosts enter **Fright mode**.
- When the **Ghosts** are in **Fright mode**:
  - They change their sprite image.  
    You can use the provided `./assets/images/ghosts/ghost-fright.png` image.
  - They stop chasing Pacman and start moving **randomly**,
    by randomly switching their movement direction.
  - After `7` seconds in Fright mode, they return back to chasing Pacman again.
  - Pacman can eat the Ghosts by colliding with them:
    - During a fright phase, eating the first Ghost will add `200` score points,
      eating a second adds `400`, the third adds `800`, the final adds `1600`.
    - The Ghost is **killed**, which temporarily removes it from the game.
      - After `5` seconds, the Ghost respawns at its original
        spawn-position, and goes back to chasing Pacman.

### Level Loading

We should represent our level in some structure, which should make
it easier for us to update the level layout.
You could represent the level via a multi-line string, where each
line represents a row of tiles in our level, and each character
represents a tile.

- Load and create all entities from our chosen level representation, including:
  - Pacman
  - The Ghosts
  - Walls
  - Pellets
  - Power Pellets

You can use or get inspiration from the provided `./assets/level.txt` file.

<details>
<summary>
    In this file, these characters represent the following entities.
</summary>

- `@` - Pacman
- `#` - Wall
- `.` - Pellet
- `*` - Power Pellet
- `B` - Blinky Ghost
- `P` - Pinky Ghost
- `I` - Inky Ghost
- `C` - Clyde Ghost
</details>

### Game Over

When a Ghost catches Pacman, it's **game over**!

- When Pacman collides with any Ghost, we should trigger a game over.
- On game over:
  - A **"Game Over"** message is displayed somewhere in our game.
  - The final **score** should be displayed.
  - **Optional**: The player should be able to input their **name**
    into an input field, which will be displayed on the **leaderboard**.

### Winning

When Pacman eats all **pellets** in the level, without getting
caught by a Ghost, then the player beats the level and wins the game!

- When Pacman has eaten all pellets in the level, the game is won.
- When the game is won, we stop our game loop, which should stop
  Pacman's and the Ghosts' movements.
- A **"You Win"** message should be displayed, alongside the
  **final score** and the **leaderboard**.
- **Optional**: The player should be able to input their **name**
  into an input field, which will be displayed on the **leaderboard**.
- **Optional**: Instead of ending the game, load the **next level**.  
  You will need to create multiple levels for this. Each subsequent
  level could add some **difficulty**, by for example, increasing
  all movement speed, decreasing fright mode duration, etc.

### Optional: Leaderboard

When the player game-overs, they can enter their name which adds the
name and the game's score to the leaderboard.  
Next to our game area, a **leaderboard** should be displayed,
listing all previous games' **scores** and their **names**.

- On game over, when the user inputs their **name** into an input field,
  the game's **score** and the given **name** are added to the **leaderboard**,
  which is saved to `localStorage`.
- When a game is started, the leaderboard should be loaded from
  `localStorage` and be displayed next to our game level.
- The scores on the leaderboard should be **sorted** by **score**,
  in **descending** order. So the highest score appears
  at the top of the leaderboard.

## Background Materials

- [Creating, inserting, removing HTML elements with JS](https://www.w3schools.com/js/js_htmldom_nodes.asp)
- [Frame-by-frame animation](https://www.geeksforgeeks.org/how-to-create-frame-by-frame-animation-using-css-and-javascript/)
- [AABB collision detection][aabb]
- [Pacman Fandom](https://pacman.fandom.com/)
- [Programming Pacman tutorial in Python](https://pacmancode.com/)  
  Use this tutorial as reference if you need to.
  Don't just follow their code, they implement the game in a
  very different way from how this project aims to do it, and how you would do it in JS.
- [Play Pacman](https://playpacman.com/pacman/)
- API docs:
  - [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/window/setInterval)
  - [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

[aabb]: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
