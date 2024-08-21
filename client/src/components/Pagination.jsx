import { Link } from 'react-router-dom';

export default function Pagination({ page, totalPages, admin, keyword='' }) {
  const maxPagesToShow = 5;

  const getPages = () => {
    const pages = [];
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return (
    <div className="flex justify-center my-5">
      <Link
        to={admin === 'admin' ? `/admin/products/${prevPage}` : keyword ? `/search/${keyword}/page/${prevPage}` : `/page/${prevPage}`}
        className={`px-4 py-2 mx-1 ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#04AA6D] text-white'} rounded`}
      >
        Previous
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          to={admin === 'admin' ? `/admin/products/${p}` : keyword ? `/search/${keyword}/page/${p}` : `/page/${p}`}
          className={`px-4 py-2 mx-1 ${p === page ? 'bg-[#04AA6D] text-white' : 'bg-gray-200'} rounded`}
        >
          {p}
        </Link>
      ))}

      <Link
        to={admin === 'admin' ? `/admin/products/${nextPage}` : keyword ? `/search/${keyword}/page/${nextPage}` : `/page/${nextPage}`}
        className={`px-4 py-2 mx-1 ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#04AA6D] text-white'} rounded`}
      >
        Next
      </Link>
    </div>
  );
}
