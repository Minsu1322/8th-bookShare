import Comment from '@/components/comment/Comment';

const MainDetail = ({ params }: { params: { id: string } }) => {
  const { id: paramsId } = params;

  return (
    <div>
      영역
      {/* ===================================================== */}
      <Comment />
    </div>
  );
};

export default MainDetail;
