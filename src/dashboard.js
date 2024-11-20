// Dashboard.js
import React from 'react';

function createData(no, namaMurid, namaGuru) {
  return { no, namaMurid, namaGuru };
}

// Data yang digunakan untuk tabel
const rows = [
  createData(1, 'M Izzul Fahmi H', 'Bu Wati'),
  createData(2, 'Maulana D Fahri', 'Bu Hindun'),
  createData(3, 'M Dimas Saputra', 'Bu Ulfa'),
  createData(4, 'M Aji Baihaqi', 'Pak Naryo'),
  createData(5, 'Maulana Saputra', 'Pak Rum')
];

const Dashboard = () => {
  return (
    <div style={{ padding: '20px', marginLeft: '240px', width: 'calc(100% - 240px)' }}>
      <h2>Data Siswa dan Guru</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>No</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nama Murid</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nama Guru</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.no}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.no}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.namaMurid}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.namaGuru}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
