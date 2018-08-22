const runner = require('../api/runner/runner')({'Property1': 'Prop1'})
const assert = require('assert')

;(async () => {
  var output = await runner.run('Echo', {Param1: 'Val1'})
  assert.equal(output.payload.Param1, 'Val1')
  assert.equal(output.payload.properties.Property1, 'Prop1')

  global.isOnErrorCalled = false

  const errorMsg1 = 'Error - rethrow'
  const output1 = await runner.run('ErrorTestKW', {ErrorMsg: errorMsg1, rethrow_error: true})
  assert.equal(output1.error, errorMsg1)
  assert.equal(global.isOnErrorCalled, true)

  global.isOnErrorCalled = false

  const errorMsg2 = 'Error - do not rethrow'
  const output2 = await runner.run('ErrorTestKW', {ErrorMsg: errorMsg2, rethrow_error: false})
  assert.equal(output2.error, undefined)
  assert.equal(global.isOnErrorCalled, true)

  output = await runner.run('ErrorRejectedPromiseTestKW', {Param1: 'Val1'})
  assert.equal(output.error, undefined)

  output = await runner.run('ErrorUncaughtExceptionTestKW', {Param1: 'Val1'})
  assert.equal(output.error, undefined)

  console.log('PASSED')
})()
