const HowItWorksTab = ({ activeTab, setActiveTab }) => {
    return (
      <div className='flex justify-center w-fit mx-auto relative bg-[#D7DCE8] mt-5 rounded-md'>
        <TabButton type='Merchants' activeTab={activeTab} onClick={setActiveTab} />
        <div
          className={`absolute w-1/2 bg-orange ${
            activeTab == 'Merchants'
              ? 'left-0 rounded-l-md'
              : 'left-2/4 rounded-r-md'
          } h-full top-0 transition-all duration-300`}
        ></div>
        <TabButton type='Customers' activeTab={activeTab} onClick={setActiveTab} />
      </div>
    )
  }
  
  const TabButton = ({ activeTab, type, onClick: setTab }) => {
    return (
      <button
        type='button'
        onClick={() => setTab(type)}
        className={`${
          type == activeTab ? 'text-white' : 'text-darkText'
        } py-4 px-8 bg-transparent font-bold text-lg z-10 rounded-md`}
      >
        {type}
      </button>
    )
  }

export default HowItWorksTab;