/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  MetricOptions,
  Counter,
  Histogram,
  ObservableGauge,
  UpDownCounter,
  ObservableCounter,
  ObservableUpDownCounter,
} from './Metric';
import { ObservableResult } from './ObservableResult';

/**
 * An interface describes additional metadata of a meter.
 */
export interface MeterOptions {
  /**
   * The schemaUrl of the meter or instrumentation library
   */
  schemaUrl?: string;
}

/**
 * An interface to allow the recording metrics.
 *
 * {@link Metric}s are used for recording pre-defined aggregation (`Counter`),
 * or raw values (`Histogram`) in which the aggregation and attributes
 * for the exported metric are deferred.
 */
export interface Meter {
  /**
   * Creates and returns a new `Histogram`.
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createHistogram(name: string, options?: MetricOptions): Histogram;

  /**
   * Creates a new `Counter` metric. Generally, this kind of metric when the
   * value is a quantity, the sum is of primary interest, and the event count
   * and value distribution are not of primary interest.
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createCounter(name: string, options?: MetricOptions): Counter;

  /**
   * Creates a new `UpDownCounter` metric. UpDownCounter is a synchronous
   * instrument and very similar to Counter except that Add(increment)
   * supports negative increments. It is generally useful for capturing changes
   * in an amount of resources used, or any quantity that rises and falls
   * during a request.
   * Example uses for UpDownCounter:
   * <ol>
   *   <li> count the number of active requests. </li>
   *   <li> count memory in use by instrumenting new and delete. </li>
   *   <li> count queue size by instrumenting enqueue and dequeue. </li>
   *   <li> count semaphore up and down operations. </li>
   * </ol>
   *
   * @param name the name of the metric.
   * @param [options] the metric options.
   */
  createUpDownCounter(name: string, options?: MetricOptions): UpDownCounter;

  /**
   * Creates a new `ObservableGauge` metric.
   * @param name the name of the metric.
   * @param [options] the metric options.
   * @param [callback] the observable callback
   */
  createObservableGauge(
    name: string,
    options?: MetricOptions,
    callback?: (observableResult: ObservableResult) => void
  ): ObservableGauge;

  /**
   * Creates a new `ObservableCounter` metric.
   * @param name the name of the metric.
   * @param [options] the metric options.
   * @param [callback] the observable callback
   */
  createObservableCounter(
    name: string,
    options?: MetricOptions,
    callback?: (observableResult: ObservableResult) => void
  ): ObservableCounter;

  /**
   * Creates a new `ObservableUpDownCounter` metric.
   * @param name the name of the metric.
   * @param [options] the metric options.
   * @param [callback] the observable callback
   */
  createObservableUpDownCounter(
    name: string,
    options?: MetricOptions,
    callback?: (observableResult: ObservableResult) => void
  ): ObservableUpDownCounter;
}
