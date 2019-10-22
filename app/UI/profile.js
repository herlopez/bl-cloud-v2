function initializeProfile(){
    document.getElementById('profile_image').addEventListener('click', ()=>{
        document.getElementById('profile_window').classList.toggle('dn');
        let profileWindow = document.getElementById('window');
        profileWindow.classList.add('cr');
        profileWindow.classList.add('ac');
        profileWindow.classList.add('jc');
        profileWindow.classList.remove('dn');
        profileWindow.innerHTML = '';
        profileWindow.addEventListener('click', ()=>{
            if(!document.getElementById('profile_window').classList.contains('dn')){
                document.getElementById('profile_window').classList.add('dn');
                profileWindow.classList.remove('cr');
                profileWindow.classList.remove('ac');
                profileWindow.classList.remove('jc');
                profileWindow.classList.add('dn');
                profileWindow.innerHTML = '';
            }


        });
        window.addEventListener('resize', ()=>{
            if(!document.getElementById('profile_window').classList.contains('dn')) {
                document.getElementById('profile_window').classList.add('dn');
                profileWindow.classList.remove('cr');
                profileWindow.classList.remove('ac');
                profileWindow.classList.remove('jc');
                profileWindow.classList.add('dn');
                profileWindow.innerHTML = '';
            }
        });
    });
}

function setProfileInformation(user) {
    document.getElementById('profile_image').src = `https://www.gravatar.com/avatar/${MD5(user.email)}`;
    document.getElementById('profile_image').classList.remove('dn');
    document.getElementById('profile_image_sidebar').classList.remove('dn');
    document.getElementById('profile_image_sidebar').src = `https://www.gravatar.com/avatar/${MD5(user.email)}`;
    document.getElementById('user_email').innerText = user.email;
    document.getElementById('user_name').innerText = user.displayName;
}
function setDefaultProfile(){
    document.getElementById('profile_image').classList.add('dn');
    document.getElementById('profile_image').src = `/images/empty-avatar.png`;
    document.getElementById('profile_image_sidebar').classList.add('dn');
    document.getElementById('profile_image_sidebar').src = `/images/empty-avatar.png`;
}