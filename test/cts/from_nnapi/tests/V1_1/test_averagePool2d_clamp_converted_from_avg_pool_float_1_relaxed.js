'use strict';
import * as utils from '../../../../utils.js';

/* eslint-disable max-len */
describe('CTS converted from NNAPI CTS', function() {
  const nn = navigator.ml.getNeuralNetworkContext();

  it('test averagePool2d + clamp converted from avg_pool_float_1_relaxed test', async function() {
    // Converted test case (from: V1_1/avg_pool_float_1_relaxed.mod.py)
    const builder = nn.createModelBuilder();
    const op1 = builder.input('op1', {type: 'float32', dimensions: [1, 2, 2, 1]});
    const op1Buffer = new Float32Array([1.0, 2.0, 3.0, 4.0]);
    const pad0 = 0;
    const cons1 = 1;
    const expected = [1.0, 2.0, 3.0, 4.0];
    const interOut0 = builder.averagePool2d(op1, {'padding': [pad0, pad0, pad0, pad0], 'strides': [cons1, cons1], 'windowDimensions': [cons1, cons1], 'layout': 'nhwc'});
    const op3 = builder.clamp(interOut0);
    const model = builder.createModel({op3});
    const compilation = await model.compile();
    const outputs = await compilation.compute({'op1': {buffer: op1Buffer}});
    utils.checkValue(outputs.op3.buffer, expected, utils.ctsFp32RelaxedAccuracyCriteria);
  });
});
/* eslint-disable max-len */
