import { gql, useLazyQuery } from '@apollo/client';
import { Button } from '@src/components/ui/Button';
import { Patient } from '../../dashboard/Table';

export function GenerateSummary({ patient }: { patient: Patient }) {
  const query = gql`
    query getUser($userId: String!) {
      generateSummary(userId: $userId) {
        generatedSummary
      }
    }
  `;
  const [getSummary, { data, loading }] = useLazyQuery(query, {
    variables: {
      userId: patient?._id,
    },
  });

  return (
    <div className='w-full mt-6'>
      <div className='flex justify-between'>
        <h3 className='mb-6 text-xl font-bold'>Medication Recommendations</h3>
        <Button onClick={() => console.log('generate :)')} disabled={loading}>
          Generate
        </Button>
      </div>
      <div className='bg-white border rounded-xl p-6'>
        <p className='text-gray-500'>
          {`Based on the patient's profile, the primary subtype is Rover. Since
          the patient is already taking naltrexone/bupropion for the Empath
          subtype, consider adding phentermine/topiramate combination for the
          Rover subtype. Initiate generic phentermine 18.75mg AND topiramate
          25mg PO daily for 14 days. If the patient's PROs are not showing
          significant changes (+/- 10%) or are decreasing, increase the
          medication dosages as indicated below: - May increase phentermine to
          37.5mg PO daily, as tolerated. - May increase topiramate to 100mg
          daily, as tolerated. Take topiramate in the evening and phentermine in
          the morning.`}
        </p>
        {/* {patient?.generatedSummary && (
          <p className='text-gray-500'>
            {loading ? 'Loading...' : patient?.generatedSummary}
          </p>
        )}
        {(!data || !loading) && (
          <p className='text-gray-500'>
            {loading ? 'Loading...' : data?.generateSummary?.generatedSummary}
          </p>
        )} */}
      </div>
    </div>
  );
}
