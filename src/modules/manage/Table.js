import React from "react";

const Table = ({ children }) => {
  return (
    <div>
      <table class="styled-table">{children}</table>
    </div>
  );
};

export default Table;
