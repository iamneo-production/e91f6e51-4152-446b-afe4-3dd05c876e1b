package com.examly.springapp.security.securityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.examly.springapp.security.securityservices.UserDetailsServiceImpl;
// import com.examly.springapp.security.AuthTokenFilter;



@Configuration
@EnableMethodSecurity


public class SecurityConfig {

@Autowired
private UserDetailsServiceImpl userDetailsServiceImpl;

@Autowired
    private AuthEntryPoint authEntryPoint;


    @Bean
        public DaoAuthenticationProvider authenticationProvider(){
            DaoAuthenticationProvider authProvider=new DaoAuthenticationProvider();
            authProvider.setUserDetailsService(userDetailsServiceImpl);
            authProvider.setPasswordEncoder(passwordEncoder());
            return authProvider;
        }

        @Bean
            public AuthenticationManager authManager(AuthenticationConfiguration authConfig) throws Exception{
                return authConfig.getAuthenticationManager();
            }
        
        @Bean
            public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
            }

        @Bean
            public AuthTokenFilter authenticatioJwTokenFilter() {
                return new AuthTokenFilter();
	}


    @Bean
    protected SecurityFilterChain filterchain(HttpSecurity http) throws Exception{
        http.cors().and().csrf().disable()
        .exceptionHandling().authenticationEntryPoint(authEntryPoint).and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
        //.authorizeRequests().antMatchers("/user/login/**","/user/signup/**","/admin/signup/**","/admin/login/**","/").permitAll()
        .authorizeRequests().antMatchers("/**").permitAll()
        .anyRequest().authenticated();
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticatioJwTokenFilter(),UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    


}



