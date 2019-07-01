import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { GameModel } from "./game-view-model";
import { World, Entity, Vector2, OBB, CollisionResponse, Shape, Component, CircleShape, CubeShape, ImageShape } from 'nativescript-tinyengine';
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";
import { GestureTypes, TouchGestureEventData } from "tns-core-modules/ui/gestures";
import labelModule = require("tns-core-modules/ui/label");


export class CollideComponent implements Component {
    public onStart(entity: Entity): void {

    }

    public onUpdate(entity: Entity): void {
        entity.setRotation(entity.getRotation() + 3);
    }

    public onCollide(collider: Entity, collided: Entity) {
        collided.getVelocity().setX(collider.getVelocity().getX());
        collided.getVelocity().setY(collider.getVelocity().getY());

        collider.getVelocity().setX(-collider.getVelocity().getX());
        collider.getVelocity().setY(-collider.getVelocity().getY());
    }

    public onDestroy(entity: Entity): void {

    }

    public getClassName(): string {
        return "CollideComponent";
    }
}


export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
	page.bindingContext = new GameModel();

	let container: LayoutBase = page.getViewById("container");

	let world: World = new World(container, 300, 300);

  //BALL
	let ballEntity: Entity = new Entity(new Vector2(150, 150), new Vector2(0, 0), 45, new CircleShape(10, '#FFFFFF'));
  ballEntity.addComponent(CollideComponent);
  world.addEntity(ballEntity);

  //PAD PLAYER 1
  let cubePad1: Entity = new Entity(new Vector2(15, 50), new Vector2(0, 0), 0, new CubeShape(20, 80, '#FFFFFF'));
  //cubePad1.addComponent(CollideComponent);
  let shapePad1 = <CubeShape>cubePad1.getShape();
  shapePad1.getImg().on(GestureTypes.touch, function (args: TouchGestureEventData) {
      cubePad1.setPosition(new Vector2(15, cubePad1.getPosition().getY() + args.getY()+25));
  });
  world.addEntity(cubePad1);

  //PAD PLAYER 2
	let cubePad2: Entity = new Entity(new Vector2(265, 50), new Vector2(0, 0), 0, new CubeShape(20, 80, '#FFFFFF'));
  //cubePad2.addComponent(CollideComponent);
  let shapePad2 = <CubeShape>cubePad2.getShape();
  shapePad2.getImg().on(GestureTypes.touch, function (args: TouchGestureEventData) {
      cubePad2.setPosition(new Vector2(265, cubePad2.getPosition().getY() + args.getY()+25));
  });
  world.addEntity(cubePad2);

	setInterval(function () { world.tick(); }, 20);
}
