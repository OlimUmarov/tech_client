import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function BasicPagination({ totalCount, onPageChange, currentPage }: Props) {
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalCount}
        color="primary"
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </Stack>
  );
}
