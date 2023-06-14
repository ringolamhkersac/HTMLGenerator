/* Job */
$('#job-header').text(`時間戳記	Company Name	Employment Type	Job Title	Job Description	Job Requirements	What you will offer or benefit	Location	Salary 	Remarks 	Contact Number / Email	Company Name	1. Contact Person	2. Office Address	3. Contact Phone Number	4. Contact Email	Business Registration Number`);
/* End Job */

/* Media */
// $('#media-header').text('時間戳記	電郵地址	Type (種類)	Name of your Social Media (專頁/頻道名稱) 	Which social media are you using now ( 您用緊邊一個社交媒體 )??	Youtube Channel Link  	Facebook Page / Group Link	Instagram Link 	Others Link 1	Others Link 2');
$('#media-header').text('時間戳記	電郵地址	Type (種類)	Name of your Social Media (專頁/頻道名稱) 	Which social media are you using now ( 您用緊邊一個社交媒體 )??	Youtube Channel Link  	Facebook Page / Group Link	Instagram Link	Others Link 1	Others Link 2	本人及其social media （Facebook, Instagram or youtube) 同意卡加里香港人會館將轉載及介紹其social media。	');
/* End Media */

/* Rent */
$('#rent-header').text('時間戳記	電郵地址	Property Heading  物業標題	Property Type  物業種類	Community 社區	Monthly Rent  月租	Security Deposit 按金	LeasingTerm 租期	Full Description 詳細描述	Special Notes 注意事項');
/* End Rent */

function splitData(id) {
  const headerInput = $("#" + id + "-header").val().trim();
  const inputText = $("#" + id + "-input").val().trim();
  const delimiter = $("#delimiter").val().trim().toString();
  const delimiterRegex = new RegExp(delimiter);
  const newStr = inputText.replace(/"[^"]+"/g, match => match.replace(/\n/g, '|'));
  const lines = newStr.split("\n");
  let header = [];
  if (id == 'job') {
    header = headerInput.split("\t").map(name => headerConversions[name] || name);
  } else if (id == 'media') {
    header = headerInput.split("\t").map(name => MediaHeaderConversions[name] || name);
  } else if (id == 'rent') {
    header = headerInput.split("\t").map(name => RentHeaderConversions[name] || name);
  }

  const result = [];
  const error = [];

  lines.forEach((line, index) => {
    const fields = line.trim().split(delimiterRegex).map(field => field.replace(/"/g, ''));
    console.log(header);
    console.log(fields);

    if (fields.length === header.length) {
      const obj = {};
      if (id == 'job') {
        header.forEach((headerField, i) => {
          obj[headerField] = i >= 4 && i <= 6 ? fields[i].split("|") : fields[i];
        });
        result.push(obj);
      } else if (id == 'media') {
        header.forEach((headerField, i) => {
          obj[headerField] = fields[i];
        });
        result.push(obj);
      } else if (id == 'rent') {
        header.forEach((headerField, i) => {
          obj[headerField] = fields[i];
        });
        result.push(obj);
      }

      console.log(obj);
      
    } else {
      error.push(`Invalid data at line ${index}: ${line}`);
    }
  });

  if (error.length > 0) {
    const errorDiv = document.getElementById("error");
    errorDiv.innerText = error.join("\n");
    errorDiv.style.display = "block";
    $("#" + id + "-result").text("Error");
  } else {
    let PostingHTML = generateListing(id, result);
    $("#" + id + "-result").text(PostingHTML);
    $("#" + id + "-error").hide();
  }
}

function generateListing(id, data) {
  data = data[0];
  let = html = "";

  console.log('generateListing', data);

  if (id == 'job') {
    const jobTitle = data.jobTitle;
    const companyName = data.companyName;
    const employmentType = data.employmentType;
    const location = data.location;
    const salary = data.salary;
    const contactNumber = data.contact;
    const contactPerson = data.contactPerson;
    const contactEmail = data.contactEmail;
    const jobDescription = data.jobDescription;
    const jobRequirements = data.jobRequirements;
    const benefits = data.benefits;
    const remarks = data.remarks;

    html = `
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
  } else if (id == 'media') {    
    html = `<div class="col-md-4" style="box-shadow: 1px 1px 4px rgb(0 0 0 / 20%);margin: 20px;">
                <div class="latest_content" style="margin: 15px !important;">              
                <div class="latest_title home" style="color:black; min-height: 31px !important;">
                  ${data.channelName}
                </div>
                <div class="latest_description" style="float: left;">`;

    if (data.fb_link) { 
      html += `<a href="${data.fb_link}" target="_blank">
                <i style="font-size: 40px;" class="fa fa-facebook-square" aria-hidden="true"></i>
              </a>`;
    }
    if (data.ig_link) { 
      html += `<a href="${data.ig_link}" target="_blank">
                <i style="font-size: 40px;" class="fa fa-instagram" aria-hidden="true"></i>
              </a>`;
    }
    if (data.youtube_link) { 
      html += `<a href="${data.youtube_link}" target="_blank">
                <i style="font-size: 40px;" class="fa fa-youtube-square" aria-hidden="true"></i>
              </a>`;
    }                              
    html += `</div>`;              
    if (data.youtube_link) { 
      html += `<a href="${data.youtube_link}" target="_blank">
                <i style="font-size: 40px;" class="fa fa-youtube-square" aria-hidden="true"></i>
              </a>`;
    }                 
    if (data.link_1) { 
      html += `<div class="latest_description" style="float: right;">
                <a href="${data.link_1}" target="_blank">
                  <i style="font-size: 35px;" class="fa fa-link" aria-hidden="true"></i>
                </a>
              </div>`;
    }             
    if (data.link_2) { 
      html += `<div class="latest_description" style="float: right;">
      <a href="${data.link_2}" target="_blank">
        <i style="font-size: 35px;" class="fa fa-link" aria-hidden="true"></i>
      </a>
    </div>`;
    }              
    html += `</div></div>`;

  } else if (id == 'rent') {
    html = `
      <div class="col-md-6" style="box-shadow: 1px 1px 4px rgb(0 0 0 / 20%);">
        <div class="latest_content" style="margin: 15px !important;">
          <div class="row">
            <div class="col-md-8">
              <div class="company" style="max-height: none;">
                <div class="latest_title home position" style="color:black; max-height: auto; min-height: auto; line-height: normal;">${data.heading}</div>
                <div class="latest_title home company_name" style="color:black; max-height: auto; min-height: auto; line-height: normal;">${data.community}</div>
                <span class="employmnent_type badge badge-success">${data.type}</span>
                <span class="salary badge badge-primary">$${data.rent}</span>
                <span class="salary badge badge-primary">$${data.deposit}</span>
                <span class="salary badge badge-primary">${data.term}</span>
              </div>
            </div>            
          </div>
          <hr>
          <div class="job_details" style="height: 250px; overflow-y: auto;">
            <div class="job_description">
              <div style="font-weight: bold;">Full Description:</div>
              <ul>
              ${data.desc}
              </ul>
            </div>
            <div class="job_requirements">
              <div style="font-weight: bold;">Special Notes:</div>
              <ul>
                ${data.notes}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  return html;
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

function copyResult(id) {
  var codeText = $("#" + id + "-result").text();
  var tempInput = $('<input>');
  $('body').append(tempInput);
  tempInput.val(codeText).select();
  document.execCommand('copy');
  tempInput.remove();
}


const headerConversions = {
  "時間戳記": "timestamp",
  "Company Name": "companyName",
  "Employment Type": "employmentType",
  "Job Title": "jobTitle",
  "Job Description": "jobDescription",
  "Job Requirements": "jobRequirements",
  "What you will offer or benefit": "benefits",
  "Location": "location",
  "Salary": "salary",
  "Remarks": "remarks",
  "Contact Number / Email": "contact",
  "1. Contact Person": "contactPerson",
  "2. Office Address": "officeAddress",
  "3. Contact Phone Number": "contactPhone",
  "4. Contact Email": "contactEmail",
  "Business Registration Number": "businessRegistrationNumber"
};

const MediaHeaderConversions = {
  "時間戳記": "timestamp",
  "電郵地址": "emailAddress",
  "Type (種類)": "type",
  "Name of your Social Media (專頁/頻道名稱) ": "channelName",
  "Which social media are you using now ( 您用緊邊一個社交媒體 )??": "platform",
  "Youtube Channel Link": "youtube_link",
  "Facebook Page / Group Link": "fb_link",
  "Instagram Link": "ig_link",
  "Others Link 1": "link_1",
  "Others Link 2": "link_2",
  "本人及其social media （Facebook, Instagram or youtube) 同意卡加里香港人會館將轉載及介紹其social media。": "agree",
};

const RentHeaderConversions = {
  "時間戳記": "timestamp",
  "電郵地址": "emailAddress",
  "Property Heading  物業標題": "heading",
  "Property Type  物業種類": "type",
  "Community 社區": "community",
  "Monthly Rent  月租": "rent",
  "Security Deposit 按金": "deposit",
  "LeasingTerm 租期": "term",
  "Full Description 詳細描述": "desc",
  "Special Notes 注意事項": "notes"  
};

function showContent(contentId) {
  $('.content').removeClass('show');
  $('#' + contentId + '-content').addClass('show');
}