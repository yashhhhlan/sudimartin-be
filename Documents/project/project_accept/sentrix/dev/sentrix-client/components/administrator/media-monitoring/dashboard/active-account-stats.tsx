const sampleActiveAccounts = [
  { id: 1, rank: 1, name: 'Trump', description: 'Sedangkan', value: 25, maxValue: 30 },
  { id: 2, rank: 2, name: 'Donald John Trump', description: 'Presiden Amerika Serikat', value: 21, maxValue: 30 },
  { id: 3, rank: 3, name: 'Perry Warjiyo', description: 'Gubernur Bank Indonesia', value: 17, maxValue: 30 },
  {
    id: 4,
    rank: 4,
    name: 'Prabowo Subianto DI..',
    description: 'Presiden Republik Indonesia ke-8',
    value: 16,
    maxValue: 30,
  },
  { id: 5, rank: 5, name: 'Josua Pardede', description: 'Kepala Bank Ekonomi Permata', value: 8, maxValue: 30 },
  {
    id: 6,
    rank: 6,
    name: 'Sri Mulyani Indrawati',
    description: 'Menteri Keuangan Republik Indonesia',
    value: 6,
    maxValue: 30,
  },
  {
    id: 7,
    rank: 7,
    name: 'Airlangga Hartarto',
    description: 'Menteri Koordinator Bidang Pere..',
    value: 5,
    maxValue: 30,
  },
  { id: 8, rank: 8, name: 'Bahlil Lahadalia', description: 'Menteri Energi Sumber daya', value: 4, maxValue: 30 },
  { id: 9, rank: 9, name: 'Kiryanto', description: 'Komisaris Independen', value: 4, maxValue: 30 },
  { id: 10, rank: 10, name: 'M. Ashidiq Iswara', description: 'Corporate Secretary', value: 4, maxValue: 30 },
];

const ActiveAccountStats = () => {
  return (
    <div className="panel w-full">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold -light">Akun Aktif</h5>
      </div>
      <div className="space-y-6">
        {sampleActiveAccounts.map((account) => (
          <div key={account.id} className="flex items-center justify-between rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <span className="text-sm font-medium text-gray-500 w-6">{account.rank}</span>
              </div>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-500 " fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0 2xl:max-w-[200px] lg:max-w-[100px]">
                <p className="text-sm font-medium text-gray-900 truncate" title={account.name}>
                  {account.name}
                </p>
                <p className="text-sm text-gray-500 truncate" title={account.description}>
                  {account.description}
                </p>
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900 ">{account.value.toFixed(1)}rb</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAccountStats;
