import { calculateMatrixNodes, reduceTo22, parseDate } from '../lib/matrix-math.js';

const testCases = [
  {
    dob: '15.08.1990',
    expected: {
      left: 15,
      top: 8,
      right: 19,
      bottom: 6,
      center: 12
    }
  },
  {
    dob: '29.12.1989',
    expected: {
      left: 11,
      top: 12,
      right: 9,
      bottom: 5,
      center: 10
    }
  }
];

let failed = false;

console.log('--- RUNNING DESTINY MATRIX MATH TESTS ---');

testCases.forEach((tc, index) => {
  try {
    const result = calculateMatrixNodes(tc.dob);
    console.log(`\nTest Case ${index + 1} (${tc.dob}):`);
    console.log('Result:', result);
    console.log('Expected:', tc.expected);
    
    let caseFailed = false;
    // Check fields
    for (const key of ['left', 'top', 'right', 'bottom', 'center']) {
      if (result[key] !== tc.expected[key]) {
        console.error(`❌ Mismatch on ${key}: Got ${result[key]}, expected ${tc.expected[key]}`);
        caseFailed = true;
        failed = true;
      }
    }
    
    if (!caseFailed) {
      console.log('✅ Passed');
    }
  } catch (error) {
    console.error(`❌ Error in test case ${index + 1}:`, error.message);
    failed = true;
  }
});

// Test subtraction method
try {
  console.log('\nTesting Subtraction Method for 15.08.1990:');
  const resultSub = calculateMatrixNodes('15.08.1990', 'subtraction');
  console.log('Result (subtraction):', resultSub);
  // 15 -> 15
  // 8 -> 8
  // Year: 1990 -> 1+9+9+0 = 19
  // Bottom: 15 + 8 + 19 = 42 -> 42 - 22 = 20
  // Center: 15 + 8 + 19 + 20 = 62 -> 62 - 22 - 22 = 18
  console.log('Expected (subtraction): left=15, top=8, right=19, bottom=20, center=18');
  if (resultSub.bottom === 20 && resultSub.center === 18) {
    console.log('✅ Subtraction reduction passed');
  } else {
    console.error('❌ Subtraction reduction failed');
    failed = true;
  }
} catch (error) {
  console.error('❌ Subtraction method test threw error:', error.message);
  failed = true;
}

if (failed) {
  console.log('\n❌ SOME TESTS FAILED');
  process.exit(1);
} else {
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY');
}
