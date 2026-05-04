package com.recovery.backend.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.recovery.backend.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private String id;
    private String username;
    private String email;
    private String profession;

    @JsonIgnore
    private String password;

    public UserDetailsImpl(String id, String username, String email, String password, String profession) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profession = profession;
    }

    public static UserDetailsImpl build(User user) {
        return new UserDetailsImpl(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getProfession());
    }

    public String getId() { return id; }
    public String getEmail() { return email; }
    public String getProfession() { return profession; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() { return email; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
