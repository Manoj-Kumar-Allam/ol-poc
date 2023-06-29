import "./Sidebar.css";

const Sidebar = ({ handleLayerChange }) => {
  return (
    <div className="sidebar-overlay">
      <div className="sidebar">
        <label>Select Layer </label>
        <select
          className="layer-dropdown"
          defaultValue="states"
          onChange={handleLayerChange}
        >
          <option value="states">USA States</option>
          <option value="counties">USA Counties</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
