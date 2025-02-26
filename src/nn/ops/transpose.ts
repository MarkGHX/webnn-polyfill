import * as tf from '@tensorflow/tfjs-core';

import {MLOperand} from '../operand';
import {SingleOutputOperation} from '../operation';
import * as utils from '../utils';

export class Transpose extends SingleOutputOperation {
  private input_: MLOperand;
  private permutation_?: number[];

  constructor(input: MLOperand, permutation?: number[]) {
    super(input.builder);
    utils.validateOperand(input);
    this.input_ = input;
    if (permutation !== undefined) {
      utils.assert(
          utils.isIntegerArray(permutation) && permutation.length !== 0,
          'The permutation parameter is invalid.');
    }
    this.permutation_ = permutation;
  }

  inputs(): MLOperand[] {
    return [this.input_];
  }

  run(inputTensors: Map<MLOperand, tf.Tensor>): tf.Tensor {
    const input: tf.Tensor = inputTensors.get(this.input_);
    return tf.transpose(input, this.permutation_);
  }
}