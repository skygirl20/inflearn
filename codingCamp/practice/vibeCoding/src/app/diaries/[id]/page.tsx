import React from 'react';
import DiariesDetail from '../../../components/diaries-detail';

interface DiariesDetailPageProps {
  params: {
    id: string;
  };
}

const DiariesDetailPage: React.FC<DiariesDetailPageProps> = ({ params }) => {
  return (
    <div>
      <DiariesDetail id={params.id} />
    </div>
  );
};

export default DiariesDetailPage;
