function add (request, reply) {
      reply('hello world');
}

function add2 (request, reply) {
      reply('hello world2');
}

exports.add = add;
exports.add2 = add2;
