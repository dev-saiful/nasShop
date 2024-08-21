// src/components/QuantitySelector.js

import { useState } from "react";

export default function QuantitySelector({ initialQty = 1, maxQty = 10, onChange }) {
  const [qty, setQty] = useState(initialQty);

  const increment = () => {
    if (qty < maxQty) {
      setQty(qty + 1);
      onChange(qty + 1);
    }
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      onChange(qty - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decrement}
        className="px-3 py-2 bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
        disabled={qty <= 1}
      >
        -
      </button>
      <span className="px-4 py-2 border border-gray-300 rounded">{qty}</span>
      <button
        onClick={increment}
        className="px-3 py-2 bg-gray-200 rounded text-gray-800 hover:bg-gray-300"
        disabled={qty >= maxQty}
      >
        +
      </button>
    </div>
  );
}
