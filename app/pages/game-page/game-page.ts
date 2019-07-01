import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { GameModel } from "./game-view-model";
import { World, Entity, Vector2, OBB, CollisionResponse, Shape, Component, CircleShape, CubeShape, ImageShape } from 'nativescript-tinyengine';
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";
import { GestureTypes, TouchGestureEventData } from "tns-core-modules/ui/gestures";
import labelModule = require("tns-core-modules/ui/label");



export class BallComponent implements Component {
    public onStart(entity: Entity): void {
      //console.log("olé");
    }

    public onUpdate(entity: Entity): void {
        //console.log(entity.getPosition().getY());
        //console.log(entity.getPosition().getX());

        if (entity.getPosition().getY()<0 || entity.getPosition().getY()>300){
          console.log("rebond");
          entity.setVelocity(getRandomDir());
        }
        if (entity.getPosition().getX()>300){
          console.log("Player 1: +1");
          entity.getPosition().setY(150);
          entity.getPosition().setX(150);
          //entity.setVelocity(getRandomDir());
        }
        if (entity.getPosition().getX()<0){
          console.log("Player 2: +1");
          entity.getPosition().setY(150);
          entity.getPosition().setX(150);
          //entity.setVelocity(getRandomDir());
        }
    }

    public onCollide(collider: Entity, collided: Entity) {
      collider.getVelocity().setX(-collider.getVelocity().getX());
    }

    public onDestroy(entity: Entity): void {

    }

    public getClassName(): string {
        return "BallComponent";
    }
}


export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
	page.bindingContext = new GameModel();

	let container: LayoutBase = page.getViewById("container");

	let world: World = new World(container, 300, 300);

  //BALL
	let ballEntity: Entity = new Entity(new Vector2(150, 150), getRandomDir(), 45, new CircleShape(10, '#FFFFFF'));
  //ballEntity.addComponent(BallComponent);
  //ballEntity.addComponent(CollideComponent);
  ballEntity.addComponent(BallComponent);
  world.addEntity(ballEntity);

  //PAD PLAYER 1
  let cubePad1: Entity = new Entity(new Vector2(15, 120), new Vector2(0, 0), 0, new CubeShape(20, 80, '#FFFFFF'));
  //cubePad1.addComponent(CollideComponent);
  let shapePad1 = <CubeShape>cubePad1.getShape();
  shapePad1.getImg().on(GestureTypes.touch, function (args: TouchGestureEventData) {
      cubePad1.setPosition(new Vector2(15, cubePad1.getPosition().getY() + args.getY()-25));
  });
  world.addEntity(cubePad1);

  //PAD PLAYER 2
	let cubePad2: Entity = new Entity(new Vector2(265, 120), new Vector2(0, 0), 0, new CubeShape(20, 80, '#FFFFFF'));
  //cubePad2.addComponent(CollideComponent);
  let shapePad2 = <CubeShape>cubePad2.getShape();
  shapePad2.getImg().on(GestureTypes.touch, function (args: TouchGestureEventData) {
      cubePad2.setPosition(new Vector2(265, cubePad2.getPosition().getY() + args.getY()-25));
  });
  world.addEntity(cubePad2);

	setInterval(function () { world.tick(); }, 20);
}

// Get a random vector direction
function getRandomDir(): Vector2 {
	let x = (Math.random() - 0.5) / 5;
	let y = (Math.random() - 0.5) / 5;

	// Trying to not have an y too low
	if (y < 0 && y > -0.15) {
		y = -0.15;
	} else if (y > 0 && y < 0.15) {
		y = 0.15;
	}

	let vec = new Vector2(x, y);
	return vec.normalize().multiply(0.07, 0.07);
}
