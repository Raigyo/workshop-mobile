import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { GameModel } from "./game-view-model";
import { World, Entity, Vector2, OBB, CollisionResponse, Shape, Component, CircleShape, CubeShape, ImageShape } from 'nativescript-tinyengine';
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
	page.bindingContext = new GameModel();

	let container: LayoutBase = page.getViewById("container");

	let world: World = new World(container, 300, 300);

	let cubeEntity: Entity = new Entity(new Vector2(0, 50), new Vector2(0, 0), 45, new CubeShape(20, 20, '#FFFFFF'));
	world.addEntity(cubeEntity);

	setInterval(function () { world.tick(); }, 20);
}
