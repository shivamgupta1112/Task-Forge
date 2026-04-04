import { useState } from "react";
import { useNavigate } from "react-router";
import api from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
      email: "",
      password: ""
    });
  
    const navigateSignup = () => {
      navigate("/register");
    };

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    };
  
    const handleLogin = async () => {
      try {
        const res = await api.login(form.email, form.password);
        const data = await res.json();
  
        if (res.ok) {
          localStorage.setItem("taskforge-token", data.token);
          navigate("/");
        }
  
      } catch (error) {
        console.error("Login error:", error);
      }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Login to TaskForge
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" className={"mt-2"} onChange={handleChange} name="email"/>
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" className={"mt-2"} onChange={handleChange} name="password"/>
          </div>

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>

      <p className="mt-4 text-sm text-muted-foreground" onClick={navigateSignup}>
        Don’t have an account?{" "}
        <span className="underline cursor-pointer hover:text-foreground">
          Sign up
        </span>
      </p>

    </div>
  );
}