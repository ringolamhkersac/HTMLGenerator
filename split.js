document.getElementById("header").value = `時間戳記	Company Name (公司名稱)	Employment Type (僱傭類別)	Job Title (職位)	Job Description (職位 / 職責描述)	Job Requirements (資歷 / 要求)	What you will offer or benefit (待遇)	Location (地區)	Salary (薪金) 	Remarks (備註) 	Contact Number / Email (聯絡電話 / 電郵)	Company Name (公司名稱)	1. Contact Person (聯絡人)	2. Office Address (公司地址)	3. Contact Phone Number (聯絡電話)	4. Contact Email (聯絡電郵)	Business Registration Number (商業登記號碼)`;

function splitData() {
    const headerInput = document.getElementById("header").value.trim();
    const inputText = document.getElementById("input").value.trim();
    const delimiter = document.getElementById('delimiter').value.trim().toString();
    const delimiterRegex = new RegExp(delimiter);
    const newStr = inputText.replace(/"[^"]+"/g, match => match.replace(/\n/g, '|'));
    const lines = newStr.split("\n");
    const header = headerInput.split("\t").map(name => headerConversions[name] || name);
    const result = [];
    const error = [];
    
    lines.forEach((line, index) => {      
        const fields = line.trim().split(delimiterRegex).map(field => field.replace(/"/g, ''));
        console.log(fields);
        if (fields.length === header.length) {
            const obj = {};
            header.forEach((headerField, i) => {
                obj[headerField] = i >= 4 && i <= 6 ? fields[i].split("|") : fields[i];
            });
            result.push(obj);
        } else {
            error.push(`Invalid data at line ${index + 2}: ${line}`);
        }
    });

    if (error.length > 0) {
        const errorDiv = document.getElementById("error");
        errorDiv.innerText = error.join("\n");
        errorDiv.style.display = "block";
        document.getElementById("result").innerText = "Error";
    } else {
        const jobPostingHTML = generateJobListing(result);
        document.getElementById("result").innerText = jobPostingHTML;
        document.getElementById("error").style.display = "none";
    }
}

function generateJobListing(jobData) {
    jobData = jobData[0];
    const jobTitle = jobData.jobTitle;
    const companyName = jobData.companyName;
    const employmentType = jobData.employmentType;
    const location = jobData.location;
    const salary = jobData.salary;
    const contactNumber = jobData.contact;
    const contactPerson = jobData.contactPerson;
    const contactEmail = jobData.contactEmail;
    const jobDescription = jobData.jobDescription;
    const jobRequirements = jobData.jobRequirements;
    const benefits = jobData.benefits;
    const remarks = jobData.remarks;

    const html = `
      <div class="col-md-6" style="box-shadow: 1px 1px 4px rgb(0 0 0 / 20%);">
        <div class="latest_content" style="margin: 15px !important;">
          <div class="row">
            <div class="col-md-8">
              <div class="company" style="max-height: none;">
                <div class="latest_title home position" style="color:black; max-height: auto; min-height: auto; line-height: normal;">${companyName}</div>
                <div class="latest_title home company_name" style="color:black; max-height: auto; min-height: auto; line-height: normal;">${jobTitle}</div>
                <span class="employmnent_type badge badge-success">${employmentType}</span>
                <span class="location badge badge-success">${location}</span>
                <span class="salary badge badge-primary">${salary}</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="how_to_apply">
                <div style="font-weight: bold;">How to Apply:</div>
                <div class="contact_number">${contactNumber}</div>
                <div class="contact_person">${contactPerson}</div>
                <div class="email">${contactEmail}</div>
              </div>
            </div>
          </div>
          <hr>
          <div class="job_details" style="height: 400px; overflow-y: auto;">
            <div class="job_description">
              <div style="font-weight: bold;">Description:</div>
              <ul>
                ${jobDescription.map(description => `<li>${description}</li>`).join('')}
              </ul>
            </div>
            <div class="job_requirements">
              <div style="font-weight: bold;">Requirements:</div>
              <ul>
                ${jobRequirements.map(requirement => `<li>${requirement}</li>`).join('')}
              </ul>
            </div>
            <div class="benefits">
              <div style="font-weight: bold;">Benefits:</div>
              <ul>
                ${benefits.map(benefit => `<li>${benefit}</li>`).join('')}
              </ul>
            </div>
            <div class="remarks">
              <div style="font-weight: bold;">Remarks:</div>
              <p>${remarks}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    return html;
}

function copyResult() {
    var result = document.getElementById("result");
    var range = document.createRange();
    range.selectNode(result);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Result copied to clipboard!");
}


const headerConversions = {
    "時間戳記": "timestamp",
    "Company Name (公司名稱)": "companyName",
    "Employment Type (僱傭類別)": "employmentType",
    "Job Title (職位)": "jobTitle",
    "Job Description (職位 / 職責描述)": "jobDescription",
    "Job Requirements (資歷 / 要求)": "jobRequirements",
    "What you will offer or benefit (待遇)": "benefits",
    "Location (地區)": "location",
    "Salary (薪金) ": "salary",
    "Remarks (備註) ": "remarks",
    "Contact Number / Email (聯絡電話 / 電郵)": "contact",
    "1. Contact Person (聯絡人)": "contactPerson",
    "2. Office Address (公司地址)": "officeAddress",
    "3. Contact Phone Number (聯絡電話)": "contactPhone",
    "4. Contact Email (聯絡電郵)": "contactEmail",
    "Business Registration Number (商業登記號碼)": "businessRegistrationNumber"
};