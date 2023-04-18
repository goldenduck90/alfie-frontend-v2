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
        <Button onClick={() => getSummary()} disabled={loading}>
          Generate
        </Button>
      </div>
      <div className='bg-white border rounded-xl p-6'>
        <p className='text-gray-500'>
          {loading ? 'Loading...' : data?.generateSummary?.generatedSummary}
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
