function sendEmail(vent) {
    var emailBody = {
      to_name: document.getElementById("to_name").value,
      from_name: document.getElementById("from_name").value,
      from_subject: document.getElementById("from_subject").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };
  
    // Service & template id need to take from Emailjs.com
    emailjs
      .send("service_901gtit", "template_5v944mk", emailBody)
      .then(function (res) {
        console.log("success", res.status);
        document.getElementById("sent-message").style.display="block";
        document.getElementById("contact_form").reset();
      });
  }