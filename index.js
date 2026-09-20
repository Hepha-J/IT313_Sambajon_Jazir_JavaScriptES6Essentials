import isPassing, { computeAverage } from './GradeUtils.js';

const enrollees = [
  { name: 'John', prelim: 80, midterm: 75, final: 90 },
  { name: 'Jane', prelim: 70, midterm: 65, final: 60 },
  { name: 'Bob', prelim: 90, midterm: 85, final: 95 },
];

const getEnrollees = (shouldfail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldfail) {
        reject(new Error('Failed to fetch enrollees'));
      } else {
        resolve(enrollees);
      }
    }, 1000);
  });
};

const generateEligibilityReport = async () => {
  try {
    console.log('Fetching enrollees...');
    const rawEnrollees = await getEnrollees();

    const processedEnrollees = rawEnrollees.map((enrollee) => {
      const { name, prelim, midterm, final } = enrollee;
      const average = computeAverage(prelim, midterm, final);
      const status = isPassing(average);

      return { name, average, status };
    });

    const passingList = processedEnrollees.filter(
      (enrollee) => enrollee.status === 'PASSING'
    );

    const totalClassAverage =
      processedEnrollees.reduce((acc, student) => acc + student.average, 0) /
      processedEnrollees.length;

    console.log('\nEnrollment Eligibility Report:');
    processedEnrollees.forEach(({ name, average, status }) => {
      console.log(
        `Name: ${name.padEnd(6)} Average: ${average.toFixed(2)}   Status: ${status}`
      );
    });

    console.log('-------------------------------------------');
    console.log(`Total Class Average: ${totalClassAverage.toFixed(2)}`);
    console.log(
      `Passing Count: ${passingList.length}/${processedEnrollees.length}`
    );
  } catch (error) {
    console.error('Error generating eligibility report:', error.message);
  }
};

generateEligibilityReport();