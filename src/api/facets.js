import resource from 'resource-router-middleware';
import facets from '../models/facets';

var v = {
	blabla: "blabla",
	show(){
		var a = [1, 2, 3];
		console.log(a.join("-|-"));
	}
}
console.log(v.show());


export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'facet',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		console.log(2);
		id = parseInt(id);
		let facet = facets.find( facet => {
			console.log(facet.id+" "+id );
			return facet.id===id
		});
		console.log(facet+" "+id);
		let	err = facet ? null : 'Not found';
		callback(err, facet);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		console.log(facets);
		res.json(facets);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = facets.length.toString(36);
		facets.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		facets.splice(facets.indexOf(facet), 1);
		res.sendStatus(204);
	}
});
