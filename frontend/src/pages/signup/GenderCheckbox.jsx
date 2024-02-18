const GenderCheckbox = ({ genderHandler, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            checked={selectedGender == "male"}
            onChange={() => {
              if (selectedGender !== "male") genderHandler("male");
            }}
            className="checkbox border-slate-900"
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            checked={selectedGender == "female"}
            onChange={() => {
              if (selectedGender !== "female") genderHandler("female");
            }}
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
