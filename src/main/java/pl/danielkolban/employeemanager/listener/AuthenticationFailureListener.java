package pl.danielkolban.employeemanager.listener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.stereotype.Component;
import pl.danielkolban.employeemanager.user.UserLoginAttemptService;

@Component
public class AuthenticationFailureListener {
    private UserLoginAttemptService loginAttemptService;

    @Autowired
    public AuthenticationFailureListener(UserLoginAttemptService loginAttemptService) {
        this.loginAttemptService = loginAttemptService;
    }

    @EventListener
    public void onAuthenticationFailure(AuthenticationFailureBadCredentialsEvent event) {
        Object principal = event.getAuthentication().getPrincipal();
        if (principal instanceof String) {
            String username = (String) event.getAuthentication().getPrincipal();
            loginAttemptService.addUserToLoggingAttemptCache(username);
        }
    }
}
