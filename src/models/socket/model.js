import Falcor from 'falcor';
import FalcorSocketDataSource from 'falcor-socket-datasource';

var model = new Falcor.Model({
    source: new FalcorSocketDataSource('/socket/model.json')
});

module.exports = model